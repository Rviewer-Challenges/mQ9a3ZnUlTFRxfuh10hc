'use client'
import React, { useState } from 'react'
import LevelButton from './Elements/LevelButton'
import { useGameContext } from '@/context/GameContext'
import { useRouter } from 'next/navigation'

const ChooseLevel = () => {
    const router = useRouter()
    const { dispatch, state } = useGameContext();
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const handleLevelSelect = (level: string) => {
        dispatch({ type: 'SELECT_LEVEL', payload: level });
        setSelectedLevel(level)
    };

    const handleStartGame = async () => {
        if(!state.selectedLevel){
            console.log(state.visible)
            alert("please select game level first !!!")
        } else {
            await dispatch({type: "START_GAME"})
            router.push('/game')
        }        
    }

    return (
        <div className="max-w-sm mx-auto flex-1 flex flex-col gap-6 lg:gap-8">
            <div className="text-white text-center">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-off-white">welcome to Memory Game</h1>
                <p className="text-xs lg:text-sm italic">please choose level</p>
            </div>
            <div className="bg-off-white w-full rounded-md px-6 py-4 flex flex-col gap-8 items-center">
                <h1 className="text-center text-xl font-bold">Levels</h1>
                <div className='flex flex-col gap-4 flex-1'>
                    <LevelButton text="easy" isChosen={selectedLevel === 'easy'} onClick={() => handleLevelSelect('easy')} />
                    <LevelButton text="medium" isChosen={selectedLevel === 'medium'} onClick={() => handleLevelSelect('medium')} />
                    <LevelButton text="hard" isChosen={selectedLevel === 'hard'} onClick={() => handleLevelSelect('hard')} />
                </div>
                <button onClick={()=> handleStartGame()} className="text-white bg-orange-color hover:bg-light-gray rounded-full w-full font-bold uppercase duration-300 text-center px-6 py-4">start play</button>
            </div>
        </div>
    )
}

export default ChooseLevel
