import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameResultModal from '@/app/_components/modals/GameResultModal';

jest.mock('../src/context/GameContext', () => ({
  useGameContext: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('GameResultModal component', () => {
  it('renders without crashing', () => {
    render(<GameResultModal movesNumber={5} setModal={jest.fn()} handleRestart={jest.fn()} />);
    expect(screen.getByText(/Oops! Your time is expire/i)).toBeInTheDocument();
  });

  it('restarts the game on Restart button click', () => {
    const handleRestartMock = jest.fn();
    render(<GameResultModal movesNumber={5} setModal={jest.fn()} handleRestart={handleRestartMock} />);
    fireEvent.click(screen.getByText('Restart'));
    expect(handleRestartMock).toHaveBeenCalled();
  });

  it('sets up a new game on Setup New Game button click', () => {
    render(<GameResultModal movesNumber={5} setModal={jest.fn()} handleRestart={jest.fn()} />);
    fireEvent.click(screen.getByText('Setup New Game'));
    expect(screen.getByText('memory')).toBeInTheDocument();
  });
});
