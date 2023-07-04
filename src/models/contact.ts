import mongoose from "mongoose";

interface IContact {
    name: string;
    url: string;
};

const ContactSchema = new mongoose.Schema<IContact>({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export default mongoose.model("contact", ContactSchema);
