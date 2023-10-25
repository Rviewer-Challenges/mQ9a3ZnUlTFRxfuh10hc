import { easy, medium, hard } from '@/utils/levels';
import { Action, GameState } from '@/utils/type';
import { initialState } from '@/context/GameContext';

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SELECT_LEVEL':
            return {
                ...state,
                selectedLevel: action.payload,
                size: action.payload === "easy" ? 16 : action.payload === "medium" ? 24 : 30,
                gameBoard: action.payload === 'easy' ? easy : action.payload === 'medium' ? medium : hard,
                selectedCards: [],
            };
        case 'INCREMENT_MOVE_COUNT':
            return { ...state, moveCount: state.moveCount + 1 };
        case 'DECREMENT_REMAINING_PAIRS':
            return { ...state, remainingPairs: state.remainingPairs - 1 };
        case 'SELECT_CARD':
            return { ...state, selectedCards: [...state.selectedCards, action.payload] };

        case 'RESTART_GAME':
            const selectedLevel = state.selectedLevel;
            return {
                ...initialState,
                selectedLevel,
                gameBoard: selectedLevel === 'easy' ? easy : selectedLevel === 'medium' ? medium : hard,
            };
        default:
            return state;
    }
};