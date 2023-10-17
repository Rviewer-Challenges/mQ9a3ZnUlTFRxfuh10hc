'use client'
import { easy, medium, hard } from '@/utils/levels';
import { GameState } from '@/utils/type';
import React, { createContext, useReducer, useContext, Dispatch } from 'react';

type Action =
    | { type: 'SELECT_LEVEL'; payload: string }
    | { type: 'INCREMENT_MOVE_COUNT' }
    | { type: 'DECREMENT_TIME' }
    | { type: 'DECREMENT_REMAINING_PAIRS' }
    | { type: 'SELECT_CARD'; payload: number }
    | { type: 'RESTART_GAME' }
    | { type: 'CHECK_MATCH' };

// Define your CardData type


const GameContext = createContext<{ state: GameState; dispatch: Dispatch<Action> } | undefined>(undefined);

const initialState: GameState = {
    selectedLevel: null,
    gameBoard: [],
    moveCount: 0,
    timeLeft: 60,
    remainingPairs: 0,
    selectedCards: [], // Initialize selected cards array
};

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SELECT_LEVEL':
            return {
                ...state,
                selectedLevel: action.payload,
                gameBoard: action.payload === 'easy' ? easy : action.payload === 'medium' ? medium : hard,
                remainingPairs: (action.payload === 'easy' ? 8 : action.payload === 'medium' ? 12 : 15) / 2,
                selectedCards: [], // Initialize selected cards array
            };
        case 'INCREMENT_MOVE_COUNT':
            return { ...state, moveCount: state.moveCount + 1 };
        case 'DECREMENT_TIME':
            return { ...state, timeLeft: state.timeLeft - 1 };
        case 'DECREMENT_REMAINING_PAIRS':
            return { ...state, remainingPairs: state.remainingPairs - 1 };
        case 'SELECT_CARD':
            return { ...state, selectedCards: [...state.selectedCards, action.payload] };
        case 'CHECK_MATCH':
            if (
                state.selectedCards.length === 2 &&
                state.gameBoard[state.selectedCards[0]]?.value === state.gameBoard[state.selectedCards[1]]?.value
            ) {
                // Cards matched, clear selected cards
                return { ...state, selectedCards: [] };
            } else {
                // Cards did not match, reset selected cards
                return { ...state, selectedCards: [] };
            }
        case 'RESTART_GAME':
            const selectedLevel = state.selectedLevel; // Get the selected level from the current state
            return {
                ...initialState,
                selectedLevel,
                gameBoard: selectedLevel === 'easy' ? easy : selectedLevel === 'medium' ? medium : hard,
            };
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

