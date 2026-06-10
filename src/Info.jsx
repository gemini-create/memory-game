import { FiRotateCcw } from "react-icons/fi";
import { FaVolumeMute, FaVolumeUp} from "react-icons/fa";
import { useEffect,useContext } from "react";
import { AudioContext } from "./AudioContext";

const Info = ({time,setTime,moves,setMoves,bestTime,gameOver,setGameOver,setRestart,onRestart}) => {
    const {volumeOn,setVolumeOn} =useContext(AudioContext);

    useEffect(()=>{
        if (gameOver) return; 
        const timer=  setTimeout(()=>{
        setTime(time=>time+1); },1000);
        return () => clearTimeout(timer) //cleanup function
    },[time,gameOver]);

    const min = Math.floor(time/60);
    const sec = time % 60;

    return (
        <div className="mainContainer">
            <h1 className="title text-center">Memory Match</h1>
            <div className="infoContainer">
                <div className="time">
                    <h3>Time</h3>
                    <p>{min}:{sec< 10 ?"0"+sec :sec}</p>
                </div>

                <div className="moves">
                    <h3>Moves</h3>
                    <p>{moves}</p>
                </div>

                <div className="best">
                    <h3>Best</h3>
                    <p>{bestTime === 0? '--':`${bestTime}s`}</p>
                </div>
            </div>
            <div className="controls">
                <button className="restart" onClick={onRestart}>
                <FiRotateCcw />Restart</button> 
                
                <button className="volume" onClick={()=>setVolumeOn(!volumeOn)}>
                {volumeOn? <FaVolumeUp/>:<FaVolumeMute/>}
                </button>
            </div>
        </div>
        )
    }
export default Info
