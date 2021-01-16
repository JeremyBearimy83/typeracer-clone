import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User";

// interface User {
//   password: String;
//   email: String;
//   username: String;
// }

export const greeting = async (parent: any, args: any, { req }: any) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) return "You are not logged in";

  try {
    const verified: any = jwt.verify(token, "lolbruhwhythough");
    const user: any = await User.findById(verified._id);
    console.log(verified);
    return `Hello ${user.username} `;
  } catch (err) {
    return "You shall not pass";
  }
};

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
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

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

export const userLogIn = async (
  _: undefined,
  { email, password }: any,
  { res, req }: any
) => {
  //CHECK IF USER EXISTS
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "Does not exist", success: false };
  }

  //CHECK IF PASSWORD IS CORRECT
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) return { message: "Invalid password", success: false };

  // const check = await bcrypt.compare(password, user.password);

  //   if (!check) {
  //     return "Auth Failed";
  //   }

  if (!process.env.SECRET) {
    throw new Error("Environment Invalid");
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  res.header("auth-token", token).send({ message: token, success: true });
  console.log(res);

  //   const token = jwt.sign(
  //     { id: user._id, name: user.name, email: user.email },
  //     process.env.SECRET
  //   );
};
