import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";

interface IUser {
    username: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<IUser, Model<IUser>>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


UserSchema.pre<IUser>("save", async function (this: IUser, next) {
    const foundUsername = await User.findOne({ username: this.username });
    const foundEmail = await User.findOne({ email: this.email });
    if(foundUsername || foundEmail) {
        throw new Error("A User with the same details already exists.")
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});

const User = mongoose.model("User", UserSchema);
export default User;
