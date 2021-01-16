import {
  userLogIn,
  userSignUp,
  greeting,
  greetingAnonymous,
} from "../controllers/auth";

export default {
  Query: {
    greeting,
    greetingAnonymous,
  },
  Mutation: {
    userSignUp,
    userLogIn,
  },
};
