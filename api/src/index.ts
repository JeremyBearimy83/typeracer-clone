import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema";
import connectDB from "./config/db";

// TOO MANY OPTIONS HALP!
// https://dev.to/yeeiodev/differences-between-express-graphql-apollo-and-graphql-yoga-3m82
// https://www.apollographql.com/blog/a-guide-to-authentication-in-graphql-e002a4039d1/

// This tool convinced me to switch to apollo
// https://github.com/dotansimha/graphql-code-generator

const app = express();
dotenv.config();
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);
