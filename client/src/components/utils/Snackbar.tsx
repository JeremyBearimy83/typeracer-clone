import React, { CSSProperties, useState } from "react";

interface Iprops {
  type: string;
  text: string;
  time: number;
}

const Snackbar = () => {
  //I CAN'T GET THE SCSS TO WORK
  //I IMPORTED IN INDEX.SCSS STILL NOT WORKING
  //SO INLINE FOR NOW :(
  const time: number = 2000;

  const styleDiv: CSSProperties = {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "green",
    position: "absolute",
    top: "90%",
    backgroundColor: "rgba(0,255,0,0.1)",
    width: "20%",
    //   textAlign: "center",
    height: "3%",
    borderRadius: "5px",
  };

  const spanDiv: CSSProperties = {
    padding: 0,
    margin: 0,
  };
  return (
    <div style={styleDiv} className="the-snackbar">
      <span style={spanDiv}>Logged in Successfully</span>
    </div>
  );
};

export default Snackbar;
