import { Router, Request, Response } from "express";
import User from "../models/user";
const router = Router();

router.post("/signup", async (req: Request<{}, {}, {username: string; password: string; email: string;}>, res: Response) => {
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

export default router;
