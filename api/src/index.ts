import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

// TOO MANY OPTIONS HALP!
// https://dev.to/yeeiodev/differences-between-express-graphql-apollo-and-graphql-yoga-3m82
// https://www.apollographql.com/blog/a-guide-to-authentication-in-graphql-e002a4039d1/

// This tool convinced me to switch to apollo
// https://github.com/dotansimha/graphql-code-generator
// Today I realised this tool can be used with anything but fuck me i already sitched and apollo is cleaner code anyways

// https://medium.com/@choudlet/how-to-combine-graphql-type-definitions-quickly-and-easily-with-apollo-server-c96c4d9a7ea1

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const path = "/graphql";

dotenv.config();
app.use(morgan("dev"));
app.use(cors());
connectDB();

server.applyMiddleware({ app, path });

// go to /graphql for the docs

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);
