import React, { ReactElement, useState, useEffect, useRef } from "react";

import Divify from "../utils/Divify";
import Track from "../utils/Track";

import { Letter } from "../../utils/types";
import { useLocation } from "react-router-dom";
import { useGame } from "../../context/GameContext";

// const textString: string =
//   "Synthetic emotions in the form of pills, psychological warfare in the form of advertising, mind-altering chemicals in the form of food, brainwashing seminars in the form of media, controlled isolated bubbles in the form of social networks.";

// const textString: string = "Please work :)";

export default function Game(): ReactElement {
  //FOR COUNDOWN
  const [started, setStarted] = useState(false);

  // GETS PARAGRAPH FROM ROOM
  const {
    state: { textString },
  }: any = useLocation();

  const game = useGame();

  console.log(game);

  // const textString = game?.room?.paragraph;

  //STORES AN ARRAY OF WORDS
  const wordsArr: string[] = textString.split(" ");

  //STORES ARRAY OF LETTER OBJECTS
  const textArr: Letter[] = textString
    .split("")
    .map((val: string) => ({ value: val, color: "grey" }));

  const [text, setText] = useState<Letter[]>(textArr);
  //THE INDEX I AM  CURRENTLY ON IN THE LETTER ARRAY
  //const [letterCount, setLetterCount] = useState<number>(1);

  //THE INDEX I AM CURRENTLY ON IN THE WORD ARRAY
  const [wordCount, setWordCount] = useState<number>(0);

  const [wordStartIndex, setWordStartIndex] = useState<number>(0);

  //CURRENT WORD BEING TYPED IN THE INPUT
  const [currentWord, setCurrentWord] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

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
        game?.incrementIndex();
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [started]);

  //console.log({ text });
  return started ? (
    <div className="game">
      {game?.room?.players.map((player) => {
        const currentPercentage =
          (player.currentWordIndex / wordsArr.length) * 100;
        console.log(player.currentWordIndex);

        return (
          <Track color={player.color} currentPercentage={currentPercentage} />
        );
      })}

      <Divify textArr={text} />
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  ) : (
    <Countdown start={() => setStarted(true)} />
  );
}

function Countdown({ start }: { start: () => void }): ReactElement {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === 3) start();
    setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, 800);
  }, [current]);

  const hints = ["Get Ready", "Hands on board", "Go!"];

  return (
    <div className="countdown">
      <section>
        <div style={{ opacity: current == 0 ? 1 : 0.4 }} className="red"></div>
        <div
          style={{ opacity: current == 1 ? 1 : 0.4 }}
          className="orange"
        ></div>
        <div
          style={{ opacity: current == 2 ? 1 : 0.4 }}
          className="green"
        ></div>
      </section>
      <section>{hints[current]}</section>
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
