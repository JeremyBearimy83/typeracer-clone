import { userLogIn, userSignUp, greeting } from "../controllers/auth";

export default {
  Query: {
    greeting,
  },
  Mutation: {
    userSignUp,
    userLogIn,
  },
};
