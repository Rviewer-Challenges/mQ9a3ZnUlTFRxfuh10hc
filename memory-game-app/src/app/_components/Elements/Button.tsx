'use client'
import React, { FC } from 'react'

type buttonProps = {
    text: string,
    handleClick: () => void
    isActive: boolean
}

const Button: FC<buttonProps> = ({ text, handleClick, isActive=false }) => {
    return (
        <button 
        onClick={handleClick} 
        className={`px-6 py-2 text-white hover:bg-orange-color duration-300 font-semibold text-lg ${isActive ? `bg-orange-color`:`bg-light-gray`} whitespace-nowrap rounded-full`}>
            {text}
        </button>
    )
}

export default Button
