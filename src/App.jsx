import Info from "./Info.jsx"
import Card from "./Card.jsx"
import { useState } from "react";
import { AudioContext } from "./AudioContext.js";
import Win from "./Win.jsx";

function App() {
    const [volumeOn, setVolumeOn] = useState(true);
    const [time,setTime] = useState(0);
    const [moves, setMoves] = useState(0);
    const [bestTime,setBestTime] = useState(0);
    const [gameOver,setGameOver] = useState(false);
    const [restart, setRestart] = useState(0);

    const handleRestart = () => {
        setTime(0);
        setMoves(0);
        setGameOver(false);
        setRestart(restart => restart + 1)
    };

  return(
      <AudioContext.Provider value={{volumeOn, setVolumeOn}}>
        <Info time={time} setTime={setTime} moves={moves} setMoves={setMoves}
            bestTime={bestTime} setRestart={setRestart} gameOver={gameOver} 
            setGameOver={setGameOver}  onRestart={handleRestart}/>

        <Card setMoves={setMoves} time={time} bestTime={bestTime}
              setBestTime={setBestTime}  gameOver={gameOver} 
              setGameOver={setGameOver}  restart={restart}/>

        <Win won={gameOver} onRestart={handleRestart} />
      </AudioContext.Provider>
  );
}

export default App
