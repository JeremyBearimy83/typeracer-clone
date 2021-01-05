import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/pages/Auth";
import Home from "./components/pages/Home";
import Play from "./components/pages/Play";
import Header from "./components/utils/Header";

import Game from "./components/Game";

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Game />
      <Switch>{/* <Route path="/" component={} /> */}</Switch>

      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/play" component={Play} />
      </Switch>
    </React.Fragment>
  );
}
