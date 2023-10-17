'use client'
import classNames from 'classnames';
import React, { FC } from 'react';

type CardCircleProps = {
    icon: React.ReactNode;
    gridSize: number;
    visible: boolean; // Pass the visibility state as a prop
    onClick: () => void;
};

const CardCircle: FC<CardCircleProps> = ({ icon, gridSize, visible, onClick }) => {
    const handleClick = () => {
        if (!visible) {
            onClick(); // Notify the parent component of the card click
        }
    };

    return (
        <div
            className={classNames(
                'text-white cursor-pointer rounded-full flex justify-center items-center transition ease-in delay-150 transform hover:translate-x-1',
                {
                    'bg-navy-blue': !visible,
                    'bg-light-gray': visible,
                    'bg-orange-color': visible,
                }
            )}
            style={{
                width: gridSize === 6 ? '46px' : '65px',
                height: gridSize === 6 ? '46px' : '65px',
                fontSize: gridSize === 6 ? '24px' : '40px',
            }}
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
