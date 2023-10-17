export type GameState = {
    selectedLevel: string | null;
    gameBoard: CardData[];
    moveCount: number;
    timeLeft: number;
    remainingPairs: number;
    selectedCards: number[];
};

export type CardData = {
    icon: JSX.Element;
    value: string;
};