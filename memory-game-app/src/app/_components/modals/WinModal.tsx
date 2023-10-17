'use client'
import React, { FC } from 'react'
import ModalLayout from './ModalLayout'
import CardBoard from '../CardBoard'
import Button from '../Elements/Button'
import { useRouter } from 'next/navigation'

type winModalProps = {
    time: string
    moves: string
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const WinModal: FC<winModalProps> = ({ time, moves, setModal }) => {
    const { push } = useRouter()
    const handleSetUpNewGame = () => {
        setModal(false)
        push("/")
    }

    const handleRestart = () => {
        setModal(false)
    }
    return (
        <ModalLayout>
            <div className='d-flex-col items-center gap-6 lg:gap-8'>
                <div className='font-bold text-center'>
                    <h3 className='text-base lg:text-lg'>Whaooo!</h3>
                    <h1 className='text-2xl lg:text-3xl'>You win!!!!</h1>
                </div>
                <div className='flex-1 w-full flex flex-col gap-2 lg:flex-row lg:gap-6'>
                    <CardBoard text='Time' result={time} />
                    <CardBoard text='Moves' result={moves} />
                </div>
                <Button isActive={false} text='Setup New Game' handleClick={handleSetUpNewGame} />
            </div>
        </ModalLayout>
    )
}

export default WinModal
