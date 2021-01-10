import React, { ReactElement } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/pages/Auth";
import Home from "./components/pages/Home";
import Play from "./components/pages/Play";
import Header from "./components/utils/Header";
import Game from "./components/pages/Game";
import Room from "./components/pages/Room";

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/play" component={Play} />
        <Route exact path="/room/:id" component={Room} />
        <Route path="/room/:id/game" component={Game} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
