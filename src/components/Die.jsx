import { useEffect, useState } from "react";

export default function Die(props) {
  return (
    <button
      className={props.isSelected ? "selected dice-btn" : "dice-btn"}
      onClick={props.click}
      disabled={props.isGameOver ? true : false}
      // accessibility
      aria-pressed={props.isSelected}
      aria-label={`Die with value ${props.value}, ${
        props.isSelected ? "is selected." : "is not selected."
      }`}
    >
      {props.value}
    </button>
  );
}
