import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultBoard from '@/app/_components/ResultBoard';

describe('ResultBoard component', () => {
  it('renders without crashing', () => {
    render(<ResultBoard text="Time" result="1:30" />);
    expect(screen.getByText('Time')).toBeInTheDocument();
  });
});
