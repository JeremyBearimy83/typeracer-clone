import React, { ReactElement } from "react";

interface Props {
  color: string;
  currentPercentage: number;
}

export default function Track({}): ReactElement {
  return (
    <div className="track">
      <div style={{ color: "#00fff5", left: "10%" }} className="car">
        <i className="fas fa-car-side"></i>
      </div>
      <div
        style={{ background: "#00fff5", width: "10%" }}
        className="completed-line"
      ></div>
    </div>
  );
}
