'use client'
import { gameReducer } from '@/reducer/GameRecuder';
import { Action, GameState } from '@/utils/type';
import React, { createContext, useReducer, useContext, Dispatch } from 'react';

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<Action> } | undefined>(undefined);

export const initialState: GameState = {
    selectedLevel: null,
    gameBoard: [],
    moveCount: 0,
    timeLeft: 60,
    size: 16,
    remainingPairs: 0,
    selectedCards: [],
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

