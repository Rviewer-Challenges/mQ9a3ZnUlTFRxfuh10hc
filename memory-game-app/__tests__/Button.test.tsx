import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@/app/_components/Elements/Button';

describe('Button component', () => {
  it('renders without crashing', () => {
    render(<Button isActive={true} text="Click me" handleClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls the handleClick function when clicked', () => {
    const handleClickMock = jest.fn();
    render(<Button isActive={true} text="Click me" handleClick={handleClickMock} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClickMock).toHaveBeenCalled();
  });

  it('applies the correct styling when isActive is true', () => {
    render(<Button text="Active Button" handleClick={() => {}} isActive={true} />);
    const button = screen.getByText('Active Button');
    expect(button).toHaveClass('bg-orange-color');
  });

  it('applies the correct styling when isActive is false', () => {
    render(<Button text="Inactive Button" handleClick={() => {}} isActive={false} />);
    const button = screen.getByText('Inactive Button');
    expect(button).toHaveClass('bg-light-gray');
  });
});
