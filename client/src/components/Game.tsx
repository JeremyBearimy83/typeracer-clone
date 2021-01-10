import React, { ReactElement, useState, useEffect } from "react";

import Divify from "./Divify";

import { Letter } from "../../types";

const textString: string =
  "Synthetic emotions in the form of pills, psychological warfare in the form of advertising, mind-altering chemicals in the form of food, brainwashing seminars in the form of media, controlled isolated bubbles in the form of social networks.";

// const textString: string = "Please work :)";

//STORES AN ARRAY OF WORDS
const wordsArr: string[] = textString.split(" ");

//STORES ARRAY OF LETTER OBJECTS
const textArr: Letter[] = textString
  .split("")
  .map((val) => ({ value: val, color: "grey" }));

export default function Game(): ReactElement {
  const [text, setText] = useState<Letter[]>(textArr);
  //THE INDEX I AM  CURRENTLY ON IN THE LETTER ARRAY
  //const [letterCount, setLetterCount] = useState<number>(1);

  //THE INDEX I AM CURRENTLY ON IN THE WORD ARRAY
  const [wordCount, setWordCount] = useState<number>(0);

  const [wordStartIndex, setWordStartIndex] = useState<number>(0);

  //CURRENT WORD BEING TYPED IN THE INPUT
  const [currentWord, setCurrentWord] = useState<any>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("HANDLE IN PUT CHANGE IN CALLED");
    setCurrentWord(event.target.value);
  };

  useEffect(() => {
    setText((prevText) => {
      console.log({ prevText });
      // const n: number = wordStartIndex + wordsArr[wordCount].length;
      // console.log({ n });
      const newText = prevText.map((l: Letter, i: number) => {
        if (i >= wordStartIndex && i < wordStartIndex + currentWord.length) {
          const subString: string = wordsArr[wordCount].substr(
            0,
            i - wordStartIndex + 1
          );
          return {
            ...l,
            color:
              subString === currentWord.substr(0, i - wordStartIndex + 1)
                ? "green"
                : "red",
          };
        } else if (i >= wordStartIndex) return { ...l, color: "grey" };
        return l;
      });
      return newText;
    });
  }, [currentWord]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key == " ") {
      if (currentWord === wordsArr[wordCount]) {
        setCurrentWord("");
        setWordCount(wordCount + 1);
        setWordStartIndex((prev) => prev + currentWord.length + 1);
        event.preventDefault();
      } else return;
    }
  };

  useEffect(() => {
    if (wordStartIndex > 0) {
      setText((prevText) => {
        const newText = Object.assign([], prevText, {
          [wordStartIndex - 1]: {
            ...prevText[wordStartIndex - 1],
            color: "green",
          },
        });
        return newText;
      });
    }
  }, [wordStartIndex]);

  //console.log({ text });
  return (
    <div className="game">
      <Divify textArr={text} />
      <div className="input-container">
        <input
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

//ACHA SO WHAT'S THE NEW PLAN
//THE NEW PLAN IS WHEN THE CURRENT WORD CHANGES
//I SHOULD SET ALL THE CURRENT CHARACTERS TO GREEN OR RED

//FEW ISSUES TO BE RESOLVED RIGHT NOW:
//TODO:
//HANDLE ERRORS DUE TO PRESSING CHARACTERS LIKE SHIFT ALT CTRL ETC

//EVERY TIME I HIT SPACE AND THE WORD TYPED IS CORRECT THE INPUT FIELD
//SHOULD CLEAR

//IF THE USER TYPES A WRONG CHARACTER CHARACTER TYPED FOLLOWING IT
// SHOULD BE RED NOT MATTER WHAT IS TYPED
//TEXTFIELD SHOULD ALSO BE RED

//DRY RUN EVERYTHING AND INTEGRATE IT WITH AKHIL'S CODE PROPERLY

// ANYTHING ELSE?
//THAT'S IT FOR NOW I GUESS
// BRUH THE WORDS ARE WRAPPING. DO WE WANT THIS BEHAVIOUR?
