'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import CardCircle from './CardCircle'
import { useGameContext } from '@/context/GameContext'
import { easy, hard, medium } from '@/utils/levels';
import { duplicatedRandomly } from '@/utils/helper';

// type CardData = {
//   id: number;
//   value: number; // Or you can use a different data type as needed
//   isFaceUp: boolean;
//   icon: ReactElement;
// };

const GamePlay = () => {
  const [visible, setVisible] = useState<boolean>(true)
  const [size, setSize] = useState(16)
  const [hits, setHits] = useState(0);
  const { state, dispatch } = useGameContext();
  const [selected, setSelected] = useState<Array<number>>([]);
  const [gameBoard, setGameBoard] = useState<{ icon: ReactElement, value: string }[]>([]);
  const { selectedLevel } = state;
  const [cardStates, setCardStates] = useState<Array<boolean>>([]);
  const [values, setValues] = useState<Array<string>>([])

  // Initialize gameBoard state

  useEffect(() => {
    let iconArray: Array<{ icon: ReactElement, value: string }>;
    if (selectedLevel === 'easy') {
      iconArray = duplicatedRandomly(easy);
      setSize(16)
    } else if (selectedLevel === 'medium') {
      setSize(24)
      iconArray = duplicatedRandomly(medium);
    } else {
      setSize(30)
      iconArray = duplicatedRandomly(hard)
    }

    setGameBoard(iconArray)
    setValues(iconArray.map((val => val.value)))

  }, [selectedLevel]);


  

  useEffect(()=> {
    setCardStates([...Array(size)].map(n => false))
  },[])

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 5000)

  }, [visible])


  console.log(values,"vvvv")
  const handleCardClick = (index:number) => {
    let newCards = [...cardStates];
    let newSelected: Array<number> = [...selected];
    let newHits = hits;

    if (newSelected.length > 1) {
      newHits++
      newCards[newSelected[0]] = false;
      newCards[newSelected[1]] = false;
      newSelected = [];
    }

    newCards[index] = true;
    newSelected.push(index);

    if (newSelected.length > 1 && values[newSelected[0]] === values[newSelected[1]]) {
      newSelected = [];
    }

    setCardStates(newCards);
    setSelected(newSelected);
    setHits(newHits);
  }

 

  


  return (
    <div>
      <div className='max-w-sm flex flex-wrap gap-4 mx-auto px-4'>
        {gameBoard.map((data, index) => (
          <CardCircle
            key={index}
            gridSize={selectedLevel === "easy" ? 4: 6}
            visible={visible ? visible : cardStates[index]}
            icon={data.icon}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <div className="text-center">
        <p>Hits: {hits}</p>
      </div>
    </div>
  )
}

export default GamePlay
