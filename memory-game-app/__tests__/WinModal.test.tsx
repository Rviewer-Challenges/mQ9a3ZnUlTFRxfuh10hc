import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import WinModal from '@/app/_components/modals/WinModal';

jest.mock('@/context/GameContext', () => ({
  useGameContext: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('WinModal component', () => {
  it('renders without crashing', () => {
    render(<WinModal time="2:00" moves="10" setModal={jest.fn()} />);
    expect(screen.getByText('Whaooo!')).toBeInTheDocument();
  });

  it('sets up a new game on Setup New Game button click', () => {
    render(<WinModal time="2:00" moves="10" setModal={jest.fn()} />);
    fireEvent.click(screen.getByText('Setup New Game'));
    expect(screen.getByText('memory')).toBeInTheDocument();
  });
});
