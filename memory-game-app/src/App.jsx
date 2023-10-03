import React, { useState } from "react";
import Game from "./components/Game";

function App() {
  const [level, setLevel] = useState("Easy");
  const [score, setScore] = useState(0);

  // Create a key that changes when the level changes
  const gameKey = `${level}-${score}`;

  return (
    <div>
      <section className="level-selector">
        <label style={{ color: "white" }}>Select Game Level:</label>
        <select onChange={(e) => setLevel(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </section>
      <section className="score">Score: {score}</section>
      {/* Use the key to force re-render of the Game component */}
      <Game key={gameKey} score={score} setScore={setScore} level={level} />
    </div>
  );
}

export default App;