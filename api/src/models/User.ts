import mongoose from "mongoose";

const userSchema = new mongoose.Schema({});

export default mongoose.model("User", userSchema);
