import React, { ReactElement } from "react";

import { Letter } from "../../utils/types";

interface IProps {
  textArr: Letter[];
}

const Divify: React.FC<IProps> = ({ textArr }: IProps) => {
  return (
    <React.Fragment>
      <div className="letter-container">
        {textArr.map((letter: Letter) => {
          return (
            <span
              className="letter"
              style={{
                backgroundColor:
                  letter.color === "green"
                    ? "#7bc74d"
                    : letter.color === "red"
                    ? "#f33535"
                    : "#1D1C20",
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
