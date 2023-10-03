import React, { useState, useEffect } from "react";
import Card from "./Card";
import { levelGame } from '../constant/card'

function Game({ level, score, setScore }) {
    const [cardsState, setCardsState] = useState(levelGame(level));
    const [firstCard, setFirstCard] = useState(null);
    const [secondClick, setSecondClick] = useState(false);
    const [wait, setWait] = useState(false);
    const [moves, setMoves] = useState(0);
    const [remainingPairs, setRemainingPairs] = useState(cardsState.length / 2);
    const [timer, setTimer] = useState(60); // 60 seconds timer
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (remainingPairs === 0) {
            setGameOver(true);
        }
    }, [remainingPairs]);

    useEffect(() => {
        if (timer === 0) {
            setGameOver(true);
        }
    }, [timer]);

    useEffect(() => {
        if (gameOver) {
            // You can handle the game-over logic here (e.g., show a message)
            // and provide an option to restart the game.
        }
    }, [gameOver]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver && timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, gameOver]);

    const restartGame = () => {
        setCardsState(levelGame(level));
        setFirstCard(null);
        setSecondClick(false);
        setWait(false);
        setMoves(0);
        setRemainingPairs(cardsState.length / 2);
        setTimer(60);
        setScore(0)
        setGameOver(false);
    };

    const checker = async (card) => {
        if (card.name === firstCard.name) {
            setScore(score + 1);
            card["passed"] = true;
            firstCard["passed"] = true;
            changeCardStatusHandler(card);
            changeCardStatusHandler(firstCard);
            setRemainingPairs(remainingPairs - 1);
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
        if (wait || gameOver) {
            return;
        }
        if (!secondClick) {
            await setFirstCard(clickedCard);
            await setSecondClick(true);
            changeCardStatusHandler(clickedCard);
            setMoves(moves + 1);
        } else {
            await setSecondClick(false);
            changeCardStatusHandler(clickedCard);
            checker(clickedCard);
            setFirstCard(null);
        }
    };

    return (
        <>
            <section className="game-info">
                <div className="move-counter">Moves: {moves}</div>
                <div className="time-counter">Time: {timer} seconds</div>
                <div className="remaining-pairs-counter">Remaining Pairs: {remainingPairs}</div>
                <button onClick={restartGame} className="restart-button">
                    Restart Game
                </button>
            </section>
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