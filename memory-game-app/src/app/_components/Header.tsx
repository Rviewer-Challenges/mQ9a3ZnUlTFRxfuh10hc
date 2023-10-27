'use client'
import React from 'react'
import Button from './Elements/Button'
import { useRouter } from 'next/navigation'
import { useGameContext } from '@/context/GameContext'

const Header = () => {
    const { dispatch } = useGameContext()
    const router = useRouter()
    const handleNewGame = () => {
        router.push('/')
        dispatch({ type: "RESET_GAME" })
    }

    return (
        <header className="py-6 lg:py-10">
            <div className='container mx-auto flex justify-between gap-4 items-center'>
                <h1 className="text-3xl font-bold lg:text-4xl">memory</h1>
                <nav className='flex flex-row gap-4 lg:gap-6'>
                    <Button isActive={false} text='New Game' handleClick={handleNewGame} />
                </nav>
            </div>
        </header>
    )
}

export default Header
