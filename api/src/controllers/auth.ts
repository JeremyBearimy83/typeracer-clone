import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User";

export const userSignUp = async (
  _: undefined,
  { username, email, password }: any
) => {
  try {
    const exisitngUser = await User.findOne({ email });

    if (exisitngUser) {
      return {
        message: "Email is already in use",
        success: false,
      };
    }

    // const existingUsername = await User.findOne({ username });

    const tag = Math.floor(1000 + Math.random() * 9000);
    const hashedPass = await bcrypt.hash(password, 10);

    let user = new User({
      tag,
      username,
      email,
      password: hashedPass,
    });

    user = await user.save();

    return {
      message: "User Created Succesfully",
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Internal Server Error",
      success: false,
    };
  }
};

export const userLogIn = async (_: undefined, { email, password }: any) => {
  const user = await User.findOne({ email });

  if (!user) {
    return "User does not exist";
  }

  // const check = await bcrypt.compare(password, user.password);

  //   if (!check) {
  //     return "Auth Failed";
  //   }

  if (!process.env.SECRET) {
    throw new Error("Environment Invalid");
  }

  //   const token = jwt.sign(
  //     { id: user._id, name: user.name, email: user.email },
  //     process.env.SECRET
  //   );
};
