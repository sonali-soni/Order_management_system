import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderList from '../components/OrderList';
import * as dataService from '../services/dataService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/dataService');

const mockOrders = [
  { id: '1', total: 100 },
  { id: '2', total: 200 },
];

describe('OrderList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    (dataService.fetchOrders as jest.Mock).mockResolvedValueOnce(mockOrders);

    render(
      <MemoryRouter>
        <OrderList />
      </MemoryRouter>
    );

    expect(screen.getByText('Order List')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Order ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Total: $100')).toBeInTheDocument();
      expect(screen.getByText('Order ID: 2')).toBeInTheDocument();
      expect(screen.getByText('Total: $200')).toBeInTheDocument();
    });
  });
});
