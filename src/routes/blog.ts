import Blog from "../models/blog";
import { Router, Request, Response } from "express";
const router = Router();

router.get("/", async (req: Request<{}, {}, {},{from: string; to: string;}>, res: Response) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);
    const blogs = await Blog.find({})
                            .skip(from)
                            .limit(to - from)
                            .sort("datePublished");
    return res.json({
        blogs
    })
});

export default router;
