import { useEffect, useState } from "react"
import Game from "./components/Game"

function App() {
  const [level, setLevel] = useState('Easy')
  const [score, setScore] = useState(0);
  useEffect(() => { }, [level])
  return (
    <div>
      <section className="level-selector">
        <label style={{color:"white"}}>Select Game Level:</label>
        <select onChange={(e) => setLevel(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </section>
      <section className="score">
        Score: {score}
      </section>
      <Game score={score} setScore={setScore} level={level} />
      
    </div>
  )
}

export default App
