import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  it('renders about page heading', () => {
    render(<About />);
    const headingElement = screen.getByText(/About Us/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('renders about page content', () => {
    render(<About />);
    const contentElement = screen.getByText(/This is a demo application to manage orders./i);
    expect(contentElement).toBeInTheDocument();
  });
});
