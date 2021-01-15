import React, { ReactElement } from "react";

interface Props {
  color: string;
  currentPercentage: number;
}

export default function Track({
  color,
  currentPercentage,
}: Props): ReactElement {
  return (
    <div className="track">
      <div style={{ color, left: `${currentPercentage}%` }} className="car">
        <i className="fas fa-car-side"></i>
      </div>
      <div
        style={{ background: color, width: `${currentPercentage}%` }}
        className="completed-line"
      ></div>
    </div>
  );
}
