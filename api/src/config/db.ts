import mongoose from "mongoose";

export default () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Environment Invalid");
  }

  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB");
    }
  );
};
