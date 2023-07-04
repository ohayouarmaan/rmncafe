import mongoose from "mongoose";

interface IBlog {
    title: string;
    description?: string;
    content: string;
    datePublished: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    datePublished: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("blog", BlogSchema);
