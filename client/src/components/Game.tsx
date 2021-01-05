import React, { ReactElement, useState, useEffect } from "react";

import Divify from "./Divify";

import { Letter } from "../../types";

const textString: string =
  "Synthetic emotions in the form of pills, psychological warfare in the form of advertising, mind-altering chemicals in the form of food, brainwashing seminars in the form of media, controlled isolated bubbles in the form of social networks.";

//STORES AN ARRAY OF WORDS
const wordsArr: string[] = textString.split(" ");

//STORES ARRAY OF LETTER OBJECTS
const textArr: Letter[] = textString
  .split("")
  .map((val) => ({ value: val, color: "grey" }));

export default function Game(): ReactElement {
  const [text, setText] = useState<Letter[]>(textArr);
  //THE INDEX I AM  CURRENTLY ON IN THE LETTER ARRAY
  const [letterCount, setLetterCount] = useState<number>(1);

  //THE INDEX I AM CURRENTLY ON IN THE WORD ARRAY
  const [wordCount, setWordCount] = useState<number>(0);

  //CURRENT WORD BEING TYPED IN THE INPUT
  const [currentWord, setCurrentWord] = useState<any>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("This is called ");
    setCurrentWord(event.target.value);
  };

  useEffect(() => {
    if (text[letterCount].color === "grey")
      setLetterCount((prev) => {
        console.log("DEcrement is caleld");
        return prev - 1;
      });
    else setLetterCount((prev) => prev + 1);
  }, [currentWord]);

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Shift") return;
  //   if (event.key === "Backspace") {
  //     setText((prevText) => {
  //       console.log("grey is called");
  //       const newText = Object.assign([], prevText, {
  //         [letterCount]: { ...text[letterCount], color: "grey" },
  //       });
  //       return newText;
  //     });
  //   } else if (event.key === text[letterCount].value) {
  //     setText((prevText) => {
  //       const newText = Object.assign([], prevText, {
  //         [letterCount]: { ...text[letterCount], color: "green" },
  //       });
  //       return newText;
  //     });
  //   } else if (event.key !== text[letterCount].value) {
  //     setText((prevText) => {
  //       const newText = Object.assign([], prevText, {
  //         [letterCount]: { ...text[letterCount], color: "red" },
  //       });
  //       return newText;
  //     });
  //   }
  // };

  console.log({ text });
  return (
    <React.Fragment>
      <Divify textArr={text} />
      <input
        style={{ padding: "20px" }}
        type="text"
        value={currentWord}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </React.Fragment>
  );
}

//SO HOW DO I WANT TO GO ABOUT THIS
//SO I NEED AN ARRAY OF WORDS AS WELL NOT JUST LETTERS
//I HAVE A LETTERS COUNTER
//I HAVE A WORDS COUNTER
//EVERYTIME I TYPE SOMETHING IN THE INPUT THE LETTERS COUNTER UPDATES DEPENDING
//ON IF IT'S RIGHT OR NOT I TURN THE COLOR RED OR GREEN
//CHECK FOR BACKSPACES
//IF THE USER TYPES A SPACE I CHECK THE CURRENT WORD WITH THE WORD ARRAY
//AND IF IT'S RIGHT INCREASE THE WORD COUNTER ELSE DO SOME RED BS

//EVERYTIME I TYPE SOMETHING I CHECK THE RESULT SO FAR WITH THE CURRENT WORD BEING CHECKED
