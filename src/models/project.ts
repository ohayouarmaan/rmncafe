import mongoose from "mongoose";

interface IProject {
    title: string;
    description: string;
    url: string;
};

const ProjectSchema = new mongoose.Schema<IProject>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
