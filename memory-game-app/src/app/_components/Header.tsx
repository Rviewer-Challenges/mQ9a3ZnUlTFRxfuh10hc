'use client'
import React from 'react'
import Button from './Elements/Button'

const Header = () => {
    return (
        <header className="py-6 lg:py-10">
            <div className='container mx-auto flex lg:justify-between gap-4 items-center'>
                <h1 className="text-3xl font-bold lg:text-4xl">memory</h1>
                <nav className='flex flex-row gap-4 lg:gap-6'>
                    <Button isActive={true} text='Restart' handleClick={() => { }} />
                    <Button isActive={false} text='New Game' handleClick={() => { }} />
                </nav>
            </div>
        </header>
    )
}

export default Header
