/** @format */

"use client";
import React, { FC } from "react";
import ModalLayout from "./ModalLayout";
import ResultBoard from "../ResultBoard";
import Button from "../Elements/Button";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/context/GameContext";

type winModalProps = {
    time: string;
    moves: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const WinModal: FC<winModalProps> = ({ time, moves, setModal }) => {
    const { push } = useRouter();
    const { dispatch } = useGameContext();
    const handleSetUpNewGame = () => {
        setModal(false);
        push("/");
        dispatch({ type: "RESET_GAME" });
    };

    return (
        <ModalLayout>
            <div className='d-flex-col items-center gap-6 lg:gap-8'>
                <div className='font-bold text-center'>
                    <h3 className='text-base lg:text-lg'>Whaooo!</h3>
                    <h1 className='text-2xl lg:text-3xl'>You win!!!!</h1>
                </div>
                <div className='flex-1 w-full flex flex-col gap-2 lg:flex-row lg:gap-6'>
                    <ResultBoard text='Time' result={time} />
                    <ResultBoard text='Moves' result={moves} />
                </div>
                <Button
                    isActive={false}
                    text='Setup New Game'
                    handleClick={handleSetUpNewGame}
                />
            </div>
        </ModalLayout>
    );
};

export default WinModal;
