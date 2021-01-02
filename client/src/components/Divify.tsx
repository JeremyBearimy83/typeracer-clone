import React, { ReactElement } from "react";

import { letter } from "../../types";

interface IProps {
  textArr: letter[];
}

export default function Divify<IProps>({ textArr }: IProps): ReactElement {
  return (
    <React.Fragment>
      {textArr.map((letter: any) => {
        return <span>{letter.val}</span>;
      })}
    </React.Fragment>
  );
}
