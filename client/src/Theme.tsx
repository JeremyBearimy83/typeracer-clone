import React, { ReactElement } from "react";
import { ThemeProvider } from "styled-components";

interface Props {
  children?: ReactElement[];
}

const theme = {
  borderRadius: "10px",
  headingColor: "#252525",
  textColor: "#29304A;",
  designBG: "#FBFBFB",
};

export default function Theme(props: Props): ReactElement {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
