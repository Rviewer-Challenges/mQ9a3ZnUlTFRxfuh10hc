export type GameState = {
    selectedLevel: string | null;
    gameBoard: CardData[];
    moveCount: number;
    timeLeft: number;
    size: number;
    remainingPairs: number;
    selectedCards: number[];
};

export type CardData = {
    icon: JSX.Element;
    value: string;
};

type Action =
    | { type: 'SELECT_LEVEL'; payload: string }
    | { type: 'INCREMENT_MOVE_COUNT' }
    | { type: 'DECREMENT_TIME' }
    | { type: 'DECREMENT_REMAINING_PAIRS' }
    | { type: 'SELECT_CARD'; payload: number }
    | { type: 'RESTART_GAME' }
    | { type: 'CHECK_MATCH' };