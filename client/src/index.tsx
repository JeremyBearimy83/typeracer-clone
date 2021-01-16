import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import GameProvider from "./context/GameContext";

const httpLink = createHttpLink({ uri: "http://localhost:8000/graphql" });
// const httpsLink = createHttpLink({
//   uri: "http://localhost:4000",
// });

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
