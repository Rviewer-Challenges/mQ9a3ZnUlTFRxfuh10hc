'use client'
import { easy, medium, hard } from '@/utils/levels';
import React, { createContext, useReducer, useContext, Dispatch } from 'react';

// Define your state and action types
type GameState = {
    selectedLevel: string | null;
    gameBoard: CardData[];
    moveCount: number;
    timeLeft: number;
    remainingPairs: number;
};

type Action =
    | { type: 'SELECT_LEVEL'; payload: string }
    | { type: 'INCREMENT_MOVE_COUNT' }
    | { type: 'DECREMENT_TIME' }
    | { type: 'DECREMENT_REMAINING_PAIRS' };

// Define your CardData type
type CardData = {
    icon: JSX.Element;
    value: string;
};

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<Action> } | undefined>(undefined);

const initialState: GameState = {
    selectedLevel: null,
    gameBoard: [],
    moveCount: 0,
    timeLeft: 60,
    remainingPairs: 0,
};

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SELECT_LEVEL':
            return {
                ...state,
                selectedLevel: action.payload,
                gameBoard: action.payload === 'easy' ? easy : action.payload === 'medium' ? medium : hard,
                remainingPairs: (action.payload === 'easy' ? 8 : action.payload === 'medium' ? 12 : 15) / 2,
            };
        case 'INCREMENT_MOVE_COUNT':
            return { ...state, moveCount: state.moveCount + 1 };
        case 'DECREMENT_TIME':
            return { ...state, timeLeft: state.timeLeft - 1 };
        case 'DECREMENT_REMAINING_PAIRS':
            return { ...state, remainingPairs: state.remainingPairs - 1 };
        default:
            return state;
    }
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

