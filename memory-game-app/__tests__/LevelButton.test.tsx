import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LevelButton from '@/app/_components/Elements/LevelButton'

describe('LevelButton component', () => {
  it('renders without crashing', () => {
    render(<LevelButton isChosen={true} text="Easy" onClick={() => {}} />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<LevelButton isChosen={false} text="Medium" onClick={onClickMock} />);
    fireEvent.click(screen.getByText('Medium'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('applies the correct styling when isChosen is true', () => {
    render(<LevelButton text="Hard" onClick={() => {}} isChosen={true} />);
    const button = screen.getByText('Hard');
    expect(button).toHaveClass('bg-orange-color');
  });

  it('applies the correct styling when isChosen is false', () => {
    render(<LevelButton text="Easy" onClick={() => {}} isChosen={false} />);
    const button = screen.getByText('Easy');
    expect(button).toHaveClass('bg-light-gray');
  });
});