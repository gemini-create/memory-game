import flipSound from "./assets/Cardflip.mp3";
import successSound from "./assets/Success.mp3";
import incorrectSound from "./assets/Incorrect.mp3";
import { AudioContext } from "./AudioContext";
import { useState,useContext,useEffect} from "react";

const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🍓"];
const TOTAL_CARDS = emojis.length * 2;
const cards = ()=>{
    return [...emojis, ...emojis].map((emoji, index) => ({
    id: index,
    value: emoji,
    isFlipped: false
}))
    .sort(() => Math.random() - 0.5); // shuffle
};

function Card({setMoves,time,bestTime,setBestTime,gameOver,setGameOver,restart}){
    // destructing audio-context for sound play
    const {volumeOn} = useContext(AudioContext);
    const [cardsState, setCardsState] = useState(cards());

    const [firstCard,setFirstCard] = useState(null);
    const [secondCard,setSecondCard] = useState(null);

    const [matched,setMatched] = useState([]);

    const [locked, setLocked] = useState(false);

        //re-initializing cards
    useEffect(() => {
        setCardsState(cards());
        setFirstCard(null);
        setSecondCard(null);
        setMatched([]);
        }, [restart]);

    useEffect(() => {
            if (!firstCard || !secondCard) 
                return;

            if (firstCard.value === secondCard.value) {
                setMatched(matched =>{

                const newMatched=[...matched, firstCard.id, secondCard.id];

                if(volumeOn){
                    const successAudio = new Audio(successSound);
                    successAudio.play();
                } 

                if (newMatched.length === TOTAL_CARDS) {
                    setGameOver(true);

                    if(time>0 && (bestTime == 0 || time<bestTime)){
                        setBestTime(time); 
                    }  
                }
                return newMatched;
            });
                setFirstCard(null);
                setSecondCard(null);
        }

            //if not match unflip both after display of 1s
            else{
                if(volumeOn){
                    const incorrectAudio = new Audio(incorrectSound);
                    incorrectAudio.play();
                }

                setLocked(true);

                setTimeout(()=>{
                    setCardsState((cardsState)=>
                        cardsState.map(card=> card.id === firstCard.id || card.id === secondCard.id ?
                            { ...card, isFlipped: false }  : card));

                    setFirstCard(null);
                    setSecondCard(null);
                    setLocked(false);
                },400);
            }
        }, [firstCard, secondCard]);

    const handleCardFlip = (id)=>{
        if (locked || gameOver) return;
        if (matched.includes(id)) return;   //already matched cards can't be clicked now

        if(volumeOn){
            const audio = new Audio(flipSound);
            audio.play();
        }

        //checking whether new clicked card is one of the already clicked/fliped/selected cards
        if (firstCard?.id === id || secondCard?.id == id)
            return;

        //flipping clicked card
        setCardsState((cardsState)=> cardsState.map((card)=>card.id === id?  {...card, isFlipped: !card.isFlipped} : card));

        const clickedCard = {...cardsState.find(card => card.id === id), isFlipped:true};

         //firstCard =null -> !null= true -> firstcard=clickedCard
        if(!firstCard){
            setFirstCard(clickedCard)
        }

        else if(!secondCard){
            setSecondCard(clickedCard)
            setMoves(moves=>moves+1);
        }
    };

    return  (
        <div className="cardContainer">
            {cardsState.map((card)=>(
                <div key={card.id}  className={`card ${card.isFlipped? "flipped":""}`} onClick={()=>handleCardFlip(card.id)}>
                    <div className="cardInner">
                        <div className="front">❓</div>
                        <div className="back">{card.value}</div>
                    </div>
                </div>
            ))}
        </div>
);
}
export default Card;