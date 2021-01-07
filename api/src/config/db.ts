import mongoose from "mongoose";

export default () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Enironment Invalid");
  }

  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB");
    }
  );
};
