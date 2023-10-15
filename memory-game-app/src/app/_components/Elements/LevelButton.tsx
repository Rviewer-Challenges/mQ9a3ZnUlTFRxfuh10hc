import React, { FC } from 'react'

type levelButtonProps = {
    onClick: () => void
    isChosen: boolean
    text: string 
}

const LevelButton: FC<levelButtonProps> = ({text, onClick, isChosen = false}) => {
    return (
        <button onClick={onClick} className={`px-8 text-white lg:px-10 py-4 bg-light-gray lg:py-6 ${isChosen ? 'bg-orange-color' : 'bg-light-gray'
            } rounded-full w-full hover:bg-orange-color bg-game-card uppercase text-lg lg:text-xl font-semibold duration-300`}>
            {text}
        </button>
    )
}

export default LevelButton
