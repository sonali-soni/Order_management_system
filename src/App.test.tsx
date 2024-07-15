import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./components/Navbar', () => () => <div data-testid="mock-navbar">Mock Navbar</div>);

describe('App Component', () => {
  it('renders home page when navigated to /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.queryByText('Order List')).not.toBeInTheDocument();
  });

  it('renders order list page when navigated to /orders', async () => {
    render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Order List')).toBeInTheDocument();
    });

    expect(screen.getByText('Order List')).toBeInTheDocument();
    expect(screen.queryByText('Home Component')).not.toBeInTheDocument();
  });

  it('renders about page when navigated to /about', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('renders navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
  });
});
