import React from 'react';
import '../src/app/_components/modals/GameResultModal'
import { render, fireEvent, screen, act } from '@testing-library/react';
import GamePlay from '@/app/_components/GamePlay';

jest.mock('../src/context/GameContext', () => ({
  useGameContext: jest.fn(() => ({
    dispatch: jest.fn(),
    state: {
      selectedLevel: 'easy',
      gameBoard: [
        { icon: 'A', isMatched: false },
        { icon: 'B', isMatched: false },
        // ... add more cards as needed
      ],
      moveCount: 0,
      cardStates: [false, false, /* ... */],
    },
  })),
}));

jest.mock('../src/app/_components/CardCircle/CardCircle', () => ({
  __esModule: true,
  default: jest.fn(() => null), // Mock CardCircle component
}));

jest.mock('../src/app/_components/modals/GameResultModal', () => ({
  __esModule: true,
  default: jest.fn(() => null), // Mock GameResultModal component
}));

jest.mock('../src/app/_components/modals/WinModal', () => ({
  __esModule: true,
  default: jest.fn(() => null), // Mock WinModal component
}));

describe('GamePlay component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<GamePlay />);
    // You might want to add more specific assertions here based on your UI
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Moves')).toBeInTheDocument();
  });

  it('calls handClick when a CardCircle is clicked', () => {
    render(<GamePlay />);
    const mockHandClick = jest.fn();
    jest.mock('../src/app/_components/CardCircle/CardCircle', () => ({
      __esModule: true,
      default: jest.fn(({ onClick }) => onClick()), // Mock CardCircle component
    }));

    act(() => {
      fireEvent.click(screen.getByTestId('card-circle-0')); // Assuming you have test IDs
    });

    expect(mockHandClick).toHaveBeenCalled();
  });

  it('calls handRestart when GameResultModal Restart button is clicked', () => {
    render(<GamePlay />);
    const mockHandRestart = jest.fn();
    jest.mock('../src/app/_components/modals/GameResultModal', () => ({
      __esModule: true,
      default: jest.fn(({ handleRestart }) => handleRestart()), // Mock GameResultModal component
    }));

    act(() => {
      fireEvent.click(screen.getByText('Restart'));
    });

    expect(mockHandRestart).toHaveBeenCalled();
  });

  it('calls setIsOpenModal when delay timer completes', () => {
    render(<GamePlay />);
    const mockSetIsOpenModal = jest.fn();

    act(() => {
      jest.advanceTimersByTime(3001); // Assuming the delay is 3000 milliseconds
    });

    expect(mockSetIsOpenModal).toHaveBeenCalledWith(true);
  });

  // Add more tests based on your component logic and UI interactions
});
