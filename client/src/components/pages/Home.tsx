import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import typing from "../../assets/typing.png";

interface Props {}

export default function Home({}: Props): ReactElement {
  return (
    <div className="home">
      <aside>
        <h1>TypeRacer</h1>
        <p>
          Take your typing skills to the next level, one keystroke at a time
        </p>
        <Link to="/play">
          <button>Start Typing</button>
        </Link>
      </aside>
      <aside>
        <img src={typing} />
      </aside>
    </div>
  );
}
