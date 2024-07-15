import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders three navigation links', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const homeLink = screen.getByText('Home');
    const ordersLink = screen.getByText('Orders');
    const aboutLink = screen.getByText('About');

    expect(homeLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it('navigates to Home page when Home link is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    // Assert that the current URL is now '/'
    expect(window.location.pathname).toBe('/');
  });

  it('navigates to Orders page when Orders link is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const ordersLink = screen.getByText('Orders');
    fireEvent.click(ordersLink);

    expect(window.location.pathname).toBe('/orders');
  });

  it('navigates to About page when About link is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    expect(window.location.pathname).toBe('/about');
  });
});
