import mongoose from "mongoose";

interface IAbout {
    about: string;
}

const aboutSchema = new mongoose.Schema<IAbout>({
    about: {
        type: String,
        required: true
    }
});

export default mongoose.model("About", aboutSchema);
