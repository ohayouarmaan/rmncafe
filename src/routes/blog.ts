import isAuth from "../helpers/isAuth";
import isAdmin from "../helpers/isAdmin";
import Blog from "../models/blog";
import { Router, Request, Response } from "express";
const router = Router();

router.get("/", async (req: Request<{}, {}, {},{from: string; to: string;}>, res: Response) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);
    console.log(from, to);
    const blogs = await Blog.find({})
                            .skip(from)
                            .limit(to - from)
                            .sort("datePublished");
    return res.json({
        blogs
    })
});

router.post("/create", isAuth, isAdmin, async(req: Request<{}, {}, { title: string; content: string; description?: string; }>, res: Response) => {
    const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        description: (req.body.description ? req.body.description : req.body.content.substring(0, 70) + "...")
    });
    try{
        await newBlog.save();
        return res.json({
            blog: newBlog
        });
    } catch(e) {
        return res.json({
            message: "An error occured while saving the new blog"
        })
    }
});

export default router;
