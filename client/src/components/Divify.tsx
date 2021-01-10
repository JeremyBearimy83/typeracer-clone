import React, { ReactElement } from "react";

import { Letter } from "../../types";

interface IProps {
  textArr: Letter[];
}

const Divify: React.FC<IProps> = ({ textArr }: IProps) => {
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {textArr.map((letter: Letter) => {
          return (
            <span
              style={{
                backgroundColor:
                  letter.color === "green"
                    ? "green"
                    : letter.color === "red"
                    ? "red"
                    : "grey",
                padding: "10px",
                margin: "2px",
              }}
            >
              {letter.value}{" "}
            </span>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Divify;
