'use client'
import React, { FC } from 'react'
import ModalLayout from './ModalLayout'
import Button from '../Elements/Button'
import { useRouter } from 'next/navigation'

type GameResultProps = {
    movesNumber: number
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GameResultModal: FC<GameResultProps> = ({ movesNumber, setModal }) => {
    const {push} = useRouter()

    const handleSetUpNewGame = () => {
        setModal(false)
        push("/")
    }

    const handleRestart = () => {
        setModal(false)
    }

    return (
        <ModalLayout>
            <div className='d-flex-col gap-6 lg:gap-8'>
                <div className='d-flex-col items-center gap-2 lg:gap-4'>
                    <h1 className='text-2xl text-dark-blue lg:text-3xl text-center font-bold'>Oops! Your time is expire!!</h1>
                    <p className='text-light-gray font-bold text-base text-center lg:text-lg'>Game is over! Here's how you got on</p>
                </div>
                <div className='d-flex-col items-center gap-8'>
                    <div className='bg-light-gray flex-1 w-full font-bold text-dark-blue flex justify-between items-center px-6 py-3 rounded-md '>
                        <h3 className='text-base lg:text-lg'>Moves taken</h3>
                        <span className='text-xl lg:text-2xl '>{movesNumber} Moves</span>
                    </div>
                    <div className='flex items-center gap-4 lg:gap-6'>
                        <Button isActive={true} text='Restart' handleClick={()=> {}}/>
                        <Button isActive={false} text='Setup New Game' handleClick={handleSetUpNewGame}/>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default GameResultModal
