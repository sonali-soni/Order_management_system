import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Component', () => {
  it('renders heading', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Products/i);
    expect(headingElement).toBeInTheDocument();
  });
});
