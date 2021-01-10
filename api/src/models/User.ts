import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
});

export default mongoose.model("User", userSchema);
