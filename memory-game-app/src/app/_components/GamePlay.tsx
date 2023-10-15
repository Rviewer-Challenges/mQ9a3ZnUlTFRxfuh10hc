'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import CardCircle from './CardCircle'
import { useGameContext } from '@/context/GameContext'
import { FaAccusoft } from 'react-icons/fa';
import { easy, hard, medium } from '@/utils/levels';

type CardData = {
  id: number;
  value: number; // Or you can use a different data type as needed
  isFaceUp: boolean;
  icon: ReactElement;
};

const GamePlay = () => {
  const [selected, setSelected] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)
  const { state, dispatch } = useGameContext();
  const [gameBoard, setGameBoard] = useState<{icon: ReactElement, value:string}[]>([]);
  const { selectedLevel } = state;

  function duplicatedRandomly(arr: Array<{ icon: ReactElement, value: string }>) {
    const duplicatedArray = arr.reduce((acc, current) => {
      const randomIndex = Math.floor(Math.random() * (acc.length + 1))
      const duplicate = { value: current.value, icon: current.icon }
      acc.splice(randomIndex, 0, current, duplicate);
      return acc
    }, [] as Array<{ icon: ReactElement, value: string }>)
    return duplicatedArray
  }

  // Initialize gameBoard state
 

  useEffect(() => {
    let iconArray: Array<{ icon: ReactElement, value: string }>;
    if (selectedLevel === 'easy') {
      iconArray = duplicatedRandomly(easy);
    } else if (selectedLevel === 'medium') {
      iconArray = duplicatedRandomly(medium);
    } else {
      iconArray = duplicatedRandomly(hard)
    }

    setGameBoard(iconArray)
    
  }, [selectedLevel]);

  useEffect(() => {
    setTimeout(() => {
      setSelected(false)
    }, 5000)

  }, [selected])

  return (
    <div>
      <div className='max-w-sm flex flex-wrap gap-4 mx-auto px-4'>
        {gameBoard.map((data, index) => (
          <CardCircle key={index} selected={selected} gridSize={4} disabled={disabled} icon={data.icon} />
        ))}
      </div>
    </div>
  )
}

export default GamePlay
