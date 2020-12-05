import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Theme from "./Theme";

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Switch>
          <Theme>{/* <Route path="/" exact component={} /> */}</Theme>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
