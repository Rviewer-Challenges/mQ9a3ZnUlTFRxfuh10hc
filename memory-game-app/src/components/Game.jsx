import React, { useState } from "react";
import Card from "./Card";
import { levelGame } from '../constant/card'

function Game({level, score, setScore}) {
   
    let [cardsState, setCardsState] = useState(levelGame(level));

    let [firstCard, setFirstCard] = useState(null);

    let [secondClick, setSecondClick] = useState(false);
    // set flag to wait for 1500ms
    let [wait, setWait] = useState(false);

    // functions
    const checker = async (card) => {
        if (card.name === firstCard.name) {
            setScore(score+1)
            console.log("hellooo");
            card["passed"] = true;
            firstCard["passed"] = true;
            changeCardStatusHandler(card);
            changeCardStatusHandler(firstCard);
        } else {
            setWait(true);
            setTimeout(() => {
                changeCardStatusHandler(card);
                changeCardStatusHandler(firstCard);
                setWait(false);
            }, 1500);
        }
    };

    const changeCardStatusHandler = async (clickedCard) => {
        if (!clickedCard.passed) clickedCard.isFlipped = !clickedCard.isFlipped;
        let index = cardsState.findIndex((card) => card.id === clickedCard.id);
        let newState = [...cardsState];
        newState.splice(index, 1, clickedCard);
        await setCardsState(newState);
    };

    const handleClick = async (e, clickedCard) => {
        if (wait) {
            return;
        }
        if (!secondClick) {
            await setFirstCard(clickedCard);
            await setSecondClick(true);
            changeCardStatusHandler(clickedCard);
        } else {
            await setSecondClick(false);
            changeCardStatusHandler(clickedCard);
            checker(clickedCard);
            setFirstCard(null);
        }
    };

    return (
        <>
            <section className="memory-game">
                {cardsState?.map((card) => {
                    return (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={(e) => handleClick(e, card)}
                        />
                    );
                })}
            </section>
        </>
    );
}

export default Game;