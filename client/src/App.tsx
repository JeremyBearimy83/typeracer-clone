import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";

import Game from "./components/Game";

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Game />
      <Switch>{/* <Route path="/" component={} /> */}</Switch>
    </React.Fragment>
  );
}
