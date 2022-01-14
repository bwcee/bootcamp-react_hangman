import React, { useState } from "react";

/* 
1. all the different states, set state functions and constants passed here
2. set state functions dun cause infinite loop where
- set state -> re-render -> set state -> re-render ...
- when component re-rendered, set state functions not called immediately cos set state functions are inside letterInputChange(). so set state functions only triggered when there is change in <input>
*/
const Form = ({
  secretWord,
  guess,
  setGuess,
  guessedLetters,
  setGuessedLetters,
  hangMan,
  setHangMan,
}) => {
  const letterInputChange = (ev) => {
    ev.target.value.length > 1
      ? alert("only key in one letter!")
      : setGuess(ev.target.value);

    if (guess != "" && !secretWord.includes(guess)) {
      guessedLetters.push(hangMan.shift());
    } else {
      secretWord.forEach((letter, index) => {
        if (guess == letter) {
          guessedLetters[index] = guess;
        }
      });
    }
    setGuessedLetters([...guessedLetters]);
    setHangMan([...hangMan]);
  };

  return (
    <div>
      <label>
        Input a letter:
        <input type="text" value={guess} onChange={letterInputChange} />
      </label>
    </div>
  );
};

const Guess = ({ guessedLetters }) => {
  const displayGuess = guessedLetters.map((el, index) => {
    return <span key={index}>{el} </span>;
  });

  return <div>{displayGuess}</div>;
};

export default function App() {
  /* 
  1. place states here, kinda like global variables in a normal js script file
  - so all functions, in this case components, can make use of the states
  2. also place all constants here
  3. bottom line, guess lazy to try to fig out just which state/constant to put in which component
  - so just place everything in App and pass them to the various components as needed
  - prob not such a good practice...dunno...  
  */
  const secretWord = ["b", "a", "n", "a", "n", "a"];
  const [guess, setGuess] = useState("");
  /* initialise guesseLetters state to be an array with only - */
  const startGuess = ["_", "_", "_", "_", "_", "_"];
  const [guessedLetters, setGuessedLetters] = useState(startGuess);
  /* initialise hangMan state to be an array the diff symbols */
  const hangSymbols = ["(", "凸", "ಠ", "益", "ಠ", ")", "凸"];
  const [hangMan, setHangMan] = useState(hangSymbols);

  return (
    <div>
      <h1> Welcome to Hangman!</h1>
      <Form
        secretWord={secretWord}
        guess={guess}
        setGuess={setGuess}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        hangMan={hangMan}
        setHangMan={setHangMan}
      />
      <Guess guessedLetters={guessedLetters} />
    </div>
  );
}
