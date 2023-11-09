import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardCircle from '@/app/_components/CardCircle/CardCircle';

// Mocking the useGameContext hook
jest.mock('../src/context/GameContext', () => ({
  useGameContext: jest.fn(() => ({
    state: {
      selectedLevel: 'easy',
    },
  })),
}));

describe('CardCircle component', () => {
  it('renders without crashing', () => {
    render(<CardCircle icon={<div>Icon</div>} visible={true} onClick={() => {}} />);
    expect(screen.getByTestId('card-circle')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<CardCircle icon={<div>Icon</div>} visible={false} onClick={onClickMock} />);
    fireEvent.click(screen.getByTestId('card-circle'));
    expect(onClickMock).toHaveBeenCalled();
  });
});