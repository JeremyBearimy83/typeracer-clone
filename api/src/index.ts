import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";

import { ApolloServer, gql } from "apollo-server-express";

import resolvers from "./graphql/resolvers";
import fs from "fs";
import path from "path";

const socketio = require("socket.io");
import { Socket } from "socket.io";
import socketHandler from "./socket";

const typeDefs = gql(
  fs.readFileSync(path.resolve(__dirname, "./graphql/schema.graphql"), {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res };
  },
});

const app = express();
dotenv.config();
app.use(cors());
connectDB();

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);

const io = socketio(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => socketHandler(socket, io));
// BRO I CHANGED THE "id" in the model to "tag"
