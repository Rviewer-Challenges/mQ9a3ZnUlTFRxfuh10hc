import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '@/app/_components/Header';

jest.mock('../src/context/GameContext', () => ({
  useGameContext: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByText('memory')).toBeInTheDocument();
  });

  it('resets the game on New Game button click', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('New Game'));
    expect(screen.getByText('memory')).toBeInTheDocument();
  });
});