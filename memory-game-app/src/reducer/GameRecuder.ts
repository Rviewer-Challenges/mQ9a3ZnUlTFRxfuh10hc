import { easy, medium, hard } from '@/utils/levels';
import { Action, GameState } from '@/utils/type';
import { initialState } from '@/context/GameContext';
import { duplicatedRandomly } from '@/utils/helper';

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SELECT_LEVEL':
            localStorage.setItem("gameLevel", action.payload)
            return {
                ...state,
                selectedLevel: action.payload,
                size: action.payload === "easy" ? 16 : action.payload === "medium" ? 24 : 30,
            };
        case 'START_GAME':
            return {
                ...state,
                cardStates: [...[...Array(state.size)].map(n => false)],
                gameBoard: state.selectedLevel === 'easy' ? duplicatedRandomly(easy) : state.selectedLevel === 'medium' ? duplicatedRandomly(medium) : duplicatedRandomly(hard),
                selectedCards: [],
            }
           
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
                newMove++
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
        case 'RESET_GAME':
            return {
                ...initialState,
                moveCount: 0,
                selectedLevel: "",
                cardStates: [...[...Array(state.size)].map(n => false)],
                gameBoard: state.selectedLevel === 'easy' ? duplicatedRandomly(easy) : state.selectedLevel === 'medium' ? duplicatedRandomly(medium) : duplicatedRandomly(hard),
            }
        case 'RESTART_GAME':
            const selectedLevel = state.selectedLevel;
            return {
                ...state,
                cardStates: [...[...Array(state.size)].map(n => false)],
                gameBoard: selectedLevel === 'easy' ? duplicatedRandomly(easy) : selectedLevel === 'medium' ? duplicatedRandomly(medium) : duplicatedRandomly(hard),
            };
        default:
            return state;
    }
};