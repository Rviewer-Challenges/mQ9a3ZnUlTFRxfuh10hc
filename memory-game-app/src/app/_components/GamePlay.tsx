/** @format */

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CardCircle from "./CardCircle/CardCircle";
import { useGameContext } from "@/context/GameContext";
import GameResultModal from "./modals/GameResultModal";
import ResultBoard from "./ResultBoard";
import WinModal from "./modals/WinModal";

const GamePlay = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isWinModal, setIsWinModal] = useState(false);
    const { state, dispatch } = useGameContext();
    const { selectedLevel, gameBoard, moveCount, cardStates } = state;

    // Timer count effect
    useEffect(() => {
        if (!visible) {
            const timerInterval = setInterval(() => {
                if (minutes === 1 && seconds === 0) {
                    setIsOpenModal(true);
                    clearInterval(timerInterval);
                } else if (!cardStates.includes(false)) {
                    clearInterval(timerInterval);
                    setIsWinModal(true);
                } else {
                    if (seconds === 59) {
                        setMinutes((prev) => prev + 1);
                        setSeconds(0);
                    } else {
                        setSeconds((prev) => prev + 1);
                    }
                }
            }, 1000);
            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [visible, seconds, minutes]);

    // delay effect
    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => {
            clearTimeout(delayTimer);
        };
    }, []);

    const handRestart = () => {
        localStorage.setItem("selectedLevel", selectedLevel!);
        dispatch({ type: "RESTART_GAME" });
        setMinutes(0);
        setSeconds(0);
        setVisible(true);
        setIsOpenModal(false);
        const delayTimer = setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    const handClick = useCallback((index: number) => {
        dispatch({ type: "SELECT_CARD", payload: index });
    }, []);

    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return (
        <div className='h-[80vh] flex items-center'>
            <div
                className={` ${
                    selectedLevel === "easy" ? `max-w-md` : `max-w-lg`
                } mx-auto d-flex-col gap-6 lg:gap-10`}
            >
                <div className='flex flex-wrap gap-4 w-full px-4'>
                    {gameBoard.map((data, index) => (
                        <CardCircle
                            key={index}
                            visible={visible ? visible : cardStates[index]}
                            icon={data.icon}
                            onClick={() => handClick(index)}
                        />
                    ))}
                </div>
                <div className='flex gap-4'>
                    <ResultBoard text='Time' result={formattedTime} />
                    <ResultBoard text='Moves' result={`${moveCount}`} />
                </div>
            </div>
            {isOpenModal && (
                <GameResultModal
                    handleRestart={handRestart}
                    setModal={setIsOpenModal}
                    movesNumber={moveCount}
                />
            )}
            {isWinModal && (
                <WinModal
                    setModal={setIsWinModal}
                    time={`0:${seconds} seconds`}
                    moves={`${moveCount} moves`}
                />
            )}
        </div>
    );
};

export default GamePlay;
