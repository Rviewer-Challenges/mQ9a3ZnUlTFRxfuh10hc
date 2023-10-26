import { easy, medium, hard } from '@/utils/levels';
import { Action, GameState } from '@/utils/type';
import { initialState } from '@/context/GameContext';
import { duplicatedRandomly } from '@/utils/helper';

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SELECT_LEVEL':
            localStorage.setItem("gameLevel",action.payload)
            return {
                ...state,
                selectedLevel: action.payload,
                size: action.payload === "easy" ? 16 : action.payload === "medium" ? 24 : 30,
            };
        case 'START_GAME':
            let newVisibility = state.visible
            setTimeout(() => {
                newVisibility = false
            }, 3000);
            return {
                ...state,
                cardStates: [...[...Array(state.size)].map(n => false)],
                gameBoard: state.selectedLevel === 'easy' ? duplicatedRandomly(easy) : state.selectedLevel === 'medium' ? duplicatedRandomly(medium) : duplicatedRandomly(hard),
                selectedCards: [],
            }
        case 'DECREMENT_REMAINING_PAIRS':
            return { ...state, remainingPairs: state.remainingPairs - 2 };
        case 'SELECT_CARD':
            let newCards = [...state.cardStates];
            let newSelected = [...state.selectedCards]
            let newMove = state.moveCount
            if (newSelected.length > 1) {
                newMove++
                newCards[newSelected[0]] = false;
                newCards[newSelected[1]] = false;
                newSelected = [];
            }
            newSelected.push(action.payload)
            newCards[action.payload] = true
            if (newSelected.length > 1 && state.gameBoard[newSelected[0]].value === state.gameBoard[newSelected[1]].value) {
                newCards[newSelected[0]] = true;
                newCards[newSelected[1]] = true;
                newSelected = [];
            }

            return {
                ...state,
                selectedCards: [...newSelected],
                cardStates: [...newCards],
                moveCount: newMove
            };

        case 'RESTART_GAME':
            const selectedLevel = state.selectedLevel;
            return {
                ...initialState,
                selectedLevel,
                size: selectedLevel === "easy" ? 16 : selectedLevel === "medium" ? 24 : 30,
                cardStates: selectedLevel === "easy" ? [...Array(16)].map(n => false) : selectedLevel === "medium" ? [...Array(24)].map(n => false) : [...Array(30)].map(n => false),
                gameBoard: selectedLevel === 'easy' ? duplicatedRandomly(easy) : selectedLevel === 'medium' ? duplicatedRandomly(medium) : duplicatedRandomly(hard),
            };
        default:
            return state;
    }
};