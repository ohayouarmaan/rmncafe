import { Router, Request, Response } from "express";
import Project from "../models/project";
import About from "../models/about";

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
});

router.get("/project/:id", async (req: Request<{id: string}>, res: Response) => {
    const project = await Project.findById(req.params.id);
    return res.json({
        project: project
    });
});

router.get("/about", async (req: Request, res: Response) => {
    const about = await About.find({});
    return res.json({
        about: about 
    });
});


export default router;
