import React, { Component } from "react";

interface Props {}
interface State {}

// https://reactjs.org/docs/error-boundaries.html

export default class ErrorBoundary extends Component<Props, State> {
  state = {};

  render() {
    return <div></div>;
  }
}
