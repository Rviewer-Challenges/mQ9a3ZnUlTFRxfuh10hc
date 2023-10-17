'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import CardCircle from './CardCircle'
import { useGameContext } from '@/context/GameContext'
import { easy, hard, medium } from '@/utils/levels';
import { duplicatedRandomly } from '@/utils/helper';
import GameResultModal from './modals/GameResultModal';
import CardBoard from './CardBoard';
import WinModal from './modals/WinModal';

const GamePlay = () => {
  const [visible, setVisible] = useState<boolean>(true)
  const [size, setSize] = useState(16)
  const [hits, setHits] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isWinModal, setIsWinModal] = useState(false)
  const { state, dispatch } = useGameContext();
  const [selected, setSelected] = useState<Array<number>>([]);
  const [gameBoard, setGameBoard] = useState<{ icon: ReactElement, value: string }[]>([]);
  const { selectedLevel } = state;
  const [cardStates, setCardStates] = useState<Array<boolean>>([]);
  const [values, setValues] = useState<Array<string>>([])
  

  // set gameBoard effect
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

  let maxFlipping = size
  // fill array with false board
  useEffect(() => {
    setCardStates([...Array(size)].map(n => false))
  }, [])

  console.log(maxFlipping)
  // Timer count effect
  useEffect(() => {
    if (!visible) {
      const timerInterval = setInterval(() => {
        if (minutes === 1 && seconds === 0) {
          setIsOpenModal(true)
          clearInterval(timerInterval);
        } else if(flippedCount === maxFlipping){
          clearInterval(timerInterval);
          setIsWinModal(true)
        } else {
          if (seconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            setSeconds(0);
          } else {
            setSeconds((prevSeconds) => prevSeconds + 1);
          }
        }
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }

  }, [minutes, seconds, visible]);

  // delay effect
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(delayTimer);
    };
  }, []);

  // handling click
  const handleCardClick = (index: number) => {
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
      setFlippedCount((count) => count + 2);
    }
    if (flippedCount + 2 === size) {
      // All cards are flipped, stop the timer and show the game result modal
      setVisible(false);
      setIsOpenModal(true);
    }
    setCardStates(newCards);
    setSelected(newSelected);
    setHits(newHits);
  }

  const handRestart = () => {
    localStorage.setItem('selectedLevel', selectedLevel!);
    dispatch({ type: 'RESTART_GAME' });

    // Reset the timer states
    setMinutes(0);
    setSeconds(0);
    setHits(0)
    setVisible(true)
    setIsOpenModal(false)
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
    setCardStates([...Array(size)].map(n => false))
    // Reset the flippedCount
    setFlippedCount(0);
    const delayTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);
  }

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className='h-[80vh] flex items-center'>
      <div className={` ${selectedLevel === 'easy' ? `max-w-md` : `max-w-lg`} mx-auto d-flex-col gap-6 lg:gap-10`}>
        <div className='flex flex-wrap gap-4 w-full px-4'>
          {gameBoard.map((data, index) => (
            <CardCircle
              key={index}
              gridSize={selectedLevel === "easy" ? 4 : 6}
              visible={visible ? visible : cardStates[index]}
              icon={data.icon}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <div className='flex gap-4'>
          <CardBoard text='Time' result={formattedTime} />
          <CardBoard text='Moves' result={`${hits}`} />
        </div>
      </div>
      {isOpenModal && (
        <GameResultModal handleRestart={handRestart} setModal={setIsOpenModal} movesNumber={hits} />
      )}
      {
        isWinModal && (
          <WinModal setModal={setIsWinModal} time={`0:${seconds} seconds`} moves={`${hits} moves`} />
        )
      }
    </div>
  )
}

export default GamePlay
