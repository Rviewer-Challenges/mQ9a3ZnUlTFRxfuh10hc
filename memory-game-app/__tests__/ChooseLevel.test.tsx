import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ChooseLevel from '@/app/_components/ChooseLevel';

jest.mock('../src/context/GameContext', () => ({
  useGameContext: jest.fn(() => ({
    dispatch: jest.fn(),
    state: { selectedLevel: 'easy' },
  })),
}));

describe('ChooseLevel component', () => {
  it('renders without crashing', () => {
    render(<ChooseLevel />);
    expect(screen.getByText(/welcome to Memory Game/i)).toBeInTheDocument();
  });

  it('selects the level on button click', () => {
    render(<ChooseLevel />);
    fireEvent.click(screen.getByText('medium'));
    expect(screen.getByText('medium')).toHaveClass('bg-orange-color');
  });

  it('starts the game when Start Play button is clicked', () => {
    render(<ChooseLevel />);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(screen.getByText('start play'));
    expect(alertSpy).toHaveBeenCalledWith('please select game level first !!!');
    alertSpy.mockRestore();
  });
});
