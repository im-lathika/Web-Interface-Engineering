
import { useState } from "react";
import "./project.css";

function Project() {
  const [display, setDisplay] = useState("");

  const calculate = () => {
    try {
      if (!display.trim()) return;
      if (!/^[0-9+\-*/.()\s]+$/.test(display)) {
        setDisplay("Error");
        return;
      }
      const result = Function('"use strict"; return (' + display + ')')();
      setDisplay(
        Number.isFinite(result) ? String(result) : "Error"
      );
    } catch {
      setDisplay("Error");
    }
  };

  const del = () => setDisplay(display.slice(0, -1));
  const reset = () => setDisplay("");

  const buttons = [
    "7", "8", "9", "DEL",
    "4", "5", "6", "+",
    "1", "2", "3", "-",
    ".", "0", "/", "*",
    "RESET", "="
  ];

  const handleClick = (value) => {
    if (value === "DEL") {
      del();
    } else if (value === "RESET") {
      reset();
    } else if (value === "=") {
      calculate();
    } else {
      setDisplay(display === "Error" ? value : display + value);
    }
  };

  return (
    <div className="app">
      <div className="calculator">
        <h1>Calculator</h1>

        <input
          type="text"
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          className="display"
        />

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button}
              className={
                button === "RESET"
                  ? "reset"
                  : button === "="
                  ? "equal"
                  : ""
              }
              onClick={() => handleClick(button)}
            >
              {button === "*" ? "×" :
               button === "/" ? "÷" : button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
