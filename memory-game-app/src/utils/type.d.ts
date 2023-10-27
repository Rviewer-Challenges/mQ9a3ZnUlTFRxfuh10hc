export type GameState = {
    selectedLevel: string | null;
    gameBoard: CardData[];
    gameLevelData: CardData[];
    cardStates: Array<boolean>;
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
    | { type: 'START_GAME' }
    | { type: 'RESTART_GAME' }
    | { type: 'RESET_GAME' }
    | { type: 'CHECK_MATCH' };