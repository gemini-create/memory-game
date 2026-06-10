import Confetti from "react-confetti";
import { FiRotateCcw } from "react-icons/fi";


function Win({ won,onRestart}) {
    console.log("WIN COMPONENT RENDERED:", won);
    if (!won) return null;
    
    return (
    <>
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={30}
            recycle={false}
            gravity={0.6}
            tweenDuration={2000}
            initialVelocityX={{ min: 15, max: 25 }}
            initialVelocityY={{ min: -20, max: -10 }}
            confettiSource={{
            x: 0,
            y: window.innerHeight/2,
            w: 20,
            h: 20
            }}
        />

        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={30}
            recycle={false}
            gravity={0.6}
            initialVelocityX={{ min: -25, max: -15 }}
            initialVelocityY={{ min: -20, max: -10 }}
            confettiSource={{
            x: window.innerWidth -20,
            y: window.innerHeight/2,
            w: 20,
            h: 20,
            }}
        />

        <div className="winOverlay">
            <div className="winBox">
                <p>🎉</p>
                <p>Congratulations!</p>
                <p>You Won!</p>
                <button className="playAgain"  onClick={onRestart}><FiRotateCcw />Play Again</button>
            </div>
        </div>
    </>
  );
}
export default Win;