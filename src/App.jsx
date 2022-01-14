import React, { useState } from "react";

/* guess state and setGuess function passed in here from App function */
const Form = ({ guess, setGuess }) => {
  const letterInputChange = (ev) => {
    ev.target.value.length > 1
      ? alert("only key in one letter!")
      : setGuess(ev.target.value);
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

/* 
whole bunch of states and constants passed in here since game logic happens here
@ states: guess, guessedLetters, hangman
@ set state function: setGuessLetters
@ constants: secretWord  
*/
const Guess = ({
  secretWord,
  guess,
  guessedLetters,
  setGuessedLetters,
  hangMan,
}) => {
  /* 
 1. guess not empty & not in secretWord, get hangMan state's first element & tack it to guessedLetters state's bum
 2. otherwise guess is right. loop thru each letter in secretWord. where guess matches letter in secretWord, update the matching position in guessedLetters w guess    
 */
  if (guess != "" && !secretWord.includes(guess)) {
    guessedLetters.push(hangMan.shift());
  } else {
    secretWord.forEach((letter, index) => {
      if (guess == letter) {
        guessedLetters[index] = guess;
      }
    });
  }

  /*  
assign array of react elements to displayGuess
*/
  const displayGuess = guessedLetters.map((el, index) => {
    return <span key={index}>{el} </span>;
  });

  // setGuessedLetters([...guessedLetters]);

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
  const [guess, setGuess] = useState("");
  const startGuess = ["_", "_", "_", "_", "_", "_"];
  /* initialise guesseLetters to be an array with only - */
  const [guessedLetters, setGuessedLetters] = useState(startGuess);
  const secretWord = ["b", "a", "n", "a", "n", "a"];
  const hangSymbols = ["(", "凸", "ಠ", "益", "ಠ", ")", "凸"];
  const [hangMan, setHangMan] = useState(hangSymbols);

  return (
    <div>
      <h1> Welcome to Hangman!</h1>
      <Form guess={guess} setGuess={setGuess} />
      <Guess
        secretWord={secretWord}
        guess={guess}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        hangMan={hangMan}
      />
    </div>
  );
}
