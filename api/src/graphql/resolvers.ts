import { userLogIn, userSignUp } from "../controllers/auth";

export default {
  Query: {
    greeting: () => "Hello World",
  },
  Mutation: {
    userSignUp,
    userLogIn,
  },
};
