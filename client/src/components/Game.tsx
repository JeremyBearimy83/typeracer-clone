import React, { ReactElement, useState } from "react";

import Divify from "./Divify";

import { letter } from "../../types";

const textString: string = "This should work!";
const textArr: letter[] = textString
  .split("")
  .map((val) => ({ value: val, color: "grey" }));

export default function Game(): ReactElement {
  const [text, setText] = useState<letter[]>(textArr);
  console.log({ text });
  return (
    <React.Fragment>
      <Divify textArr={textArr} />
    </React.Fragment>
  );
}
