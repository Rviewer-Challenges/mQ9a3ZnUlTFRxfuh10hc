'use client'
import { useGameContext } from '@/context/GameContext';
import classNames from 'classnames';
import React, { FC } from 'react';

type CardCircleProps = {
    icon: React.ReactNode;
    gridSize: number;
    visible: boolean; // Pass the visibility state as a prop
    onClick: () => void;
};

const CardCircle: FC<CardCircleProps> = ({ icon, gridSize, visible, onClick }) => {
    const { state } = useGameContext();
    const { selectedLevel } = state;
    const handleClick = () => {
        if (!visible) {
            onClick(); // Notify the parent component of the card click
        }
    };

    return (
        <div
            className={classNames(
            `text-white w-20 cursor-pointer ${selectedLevel==='easy' ? 'text-2xl lg:w-[85px] lg:h-[85px] w-16 h-16':'text-[40px] lg:w-16 lg:h-16 w-14 h-14'} rounded-full flex justify-center items-center transition ease-in delay-150 transform hover:translate-x-1`,
                {
                    'bg-navy-blue': !visible,
                    'bg-light-gray': visible,
                    'bg-orange-color': visible,
                }
            )}
            onClick={handleClick} // Handle card click to reveal it
        >
            {visible && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {icon}
                </button>
            )}
        </div>
    );
};

export default CardCircle;
