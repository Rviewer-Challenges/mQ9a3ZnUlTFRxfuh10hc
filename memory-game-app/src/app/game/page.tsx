import React from 'react'
import Header from '../_components/Header'
import GamePlay from '../_components/GamePlay'

const Game = () => {
  return (
    <div className='w-full bg-off-white min-h-screen px-6 lg:px-0'>
        <Header/> 
        <main className="">
            <GamePlay/>
        </main>
    </div>
  )
}

export default Game
