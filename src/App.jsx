import React, { useEffect, useRef, useState } from "react";
import Die from "./components/Die";

const numberOfDices = 10;

export default function App() {
  //const [isFinished, setIsFinished] = useState(false);
  const [numbers, setNumbers] = useState(() =>
    setInitialDisplay(numberOfDices)
  );
  const newGameButtonRef = useRef(null);

  // Check if there is win on every re-render
  // Go through every items in state and check if all the isSelected = true
  // If true check if those values are all the same. Comparing each values with the first does the job
  // If yes -> isFinished = true    --   If not, false
  const isFinished =
    numbers.every((die) => die.isSelected) &&
    numbers.every((die) => die.value === numbers[0].value); // --> true or false

  // Accessibility - focus on the new game button automatically when isFinished = true
  useEffect(() => {
    if (isFinished) {
      newGameButtonRef.current.focus();
    }
  }, [isFinished]);

  function getRandom() {
    return Math.floor(6 * Math.random() + 1);
  }

  function setInitialDisplay(numberOfDices) {
    const allDice = [];
    for (let i = 1; i <= numberOfDices; i++) {
      const random = getRandom();
      allDice.push({
        id: i,
        value: random,
        isSelected: false,
      });
    }
    return allDice;
  }

  // Render a Die component for each number generated and send its value as prop
  const diceElements = numbers.map((die, index) => (
    <Die
      value={die.value}
      key={die.id}
      click={() => toggleSelected(die.id)}
      isSelected={die.isSelected}
      isGameOver={isFinished}
    />
  ));

  // Toggle isSelected when die is clicked
  // Run through the prev array of objects in state
  // Map each one, and check if it's id === id passed
  // update the isSelected to the opposite of previous
  function toggleSelected(id) {
    setNumbers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isSelected: !item.isSelected,
            }
          : item
      )
    );
  }

  function roll() {
    setNumbers((prev) =>
      prev.map((item) => ({
        ...item,
        value: item.isSelected ? item.value : getRandom(),
      }))
    );
  }

  function newGame() {
    setNumbers(setInitialDisplay(numberOfDices));
  }

  return (
    <main>
      <div className="main-container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <section className="die-section">{diceElements}</section>

        <button
          className="roll-btn"
          onClick={isFinished ? newGame : roll}
          ref={newGameButtonRef}
        >
          {isFinished ? "New Game" : "Roll"}
        </button>

        {/* Accessibility - let user know when game is finished*/}
        {isFinished && (
          <div aria-live="polite" className="sr-only">
            <p>
              Congratulations! You have won! Press "new game" to start again.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
