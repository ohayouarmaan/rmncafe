import { Router, Request, Response } from "express";
import Project from "../models/project";

const router = Router();
router.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Working!"
    })
});

router.get("/projects", async (req: Request, res: Response) => {
    const projects = await Project.find({});
    return res.json({
        projects: projects
    });
})

export default router;
