import { Router, Request, Response } from "express";
import INewRequest from "../custom-request-type";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import AuthHelper from "../helpers/isAuth";
import User from "../models/user";
const router = Router();

type UserTypeSignUp = {username: string; password: string; email: string;}
type UserTypeSignIn = {username?: string; password: string; email?: string;}

router.post("/signup", async (req: Request<{}, {}, UserTypeSignUp>, res: Response) => {
    console.log(req.body);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try{
        await newUser.save();
    } catch (e: any) {
        if(e.message == "A User with the same details already exists."){
            return res.json({
                message: e.message
            });
        } else {
            console.error(e);
            return res.json({
                message: "Something went wrong."
            });
        }
    }
    return res.json({
        message: "Signing up."
    })
});

router.post("/signin", async (req: Request<{}, {}, UserTypeSignIn>, res: Response) => {
    let foundUser;
    if(req.body.email){
        foundUser = await User.findOne({email: req.body.email});
    } else {
        foundUser = await User.findOne({username: req.body.username});
    };
    if(!foundUser){
        return res.json({
            error: ["No user found"]
        });
    };
    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if(!isMatch){
        return res.json({
            error: ["invalid password"]
        });
    };
    const payload = {
        user: foundUser._id
    };
    try{
        const signedPayload = await jwt.sign(payload, process.env.JWT_SECRET || "very secure password", {
            expiresIn: "365d"
        });
        return res.json({
            payload: signedPayload
        });
    } catch(e: any) {
        return res.json({
            error: e.message
        });
    };
})

router.get("/me", AuthHelper, (req: Request, res: Response) => {
    return res.json({
        message: `Hello ${(req as INewRequest).user}`
    });
})

export default router;
