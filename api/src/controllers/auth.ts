import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User";

// interface User {
//   password: String;
//   email: String;
//   username: String;
// }

export const greetingAnonymous = (
  parent: undefined,
  args: undefined,
  { res }: any
) => {
  return { message: "Hello Anonymous, I am dad.", success: true };
};

export const greeting = async (parent: any, args: any, { req }: any) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) return { message: "You are not logged in", success: false };

  try {
    const verified: any = jwt.verify(token, "lolbruhwhythough");
    const user: any = await User.findById(verified._id);
    console.log(verified);
    return { message: `Hello ${user.username} `, success: true };
  } catch (err) {
    return { message: "There is an importer among us", success: true };
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
  console.log(user);
  console.log(user.email);
  console.log(password);
  console.log(user.password);

  //CHECK IF PASSWORD IS CORRECT
  try {
    const validPassword = await bcrypt.compare(password, user.password);
    console.log({ validPassword });
    if (!validPassword) return { message: "Invalid password", success: false };
  } catch (e) {
    // console.log(e);
    return { message: "Another erroryaay", success: false };
  }

  // bcrypt.compare(req.body.password, user.password, function (err, res) {
  //   console.log(err);
  //   console.log(res);
  //   if (err) {
  //     return { success: false, message: "Another erryr :{" };
  //   }
  //   if (res) {
  //     return { success: true, message: "finally" };
  //   } else {
  //     // response is OutgoingMessage object that server response http request
  //     return { success: false, message: "passwords do not match" };
  //   }
  // });

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
  // res.header("auth-token", token).send({ message: token, success: true });
  res.send({ message: token, success: true });

  //   const token = jwt.sign(
  //     { id: user._id, name: user.name, email: user.email },
  //     process.env.SECRET
  //   );
};
