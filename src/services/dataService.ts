import { Product, Order } from '../types/index';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/products.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const responses = await Promise.all([
      fetch('/order1.json'),
      fetch('/order2.json'),
      fetch('/order3.json')
    ]);

    const data = await Promise.all(responses.map(response => response.json()));

    const allOrders = data.flat();

    return allOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchOrderDetail = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await fetch(`/order${orderId}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const placeOrder = async (order: Order): Promise<string> => {
  try {
    const response = await fetch('/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    const data = await response.json();
    if (data.success) {
      return 'Order placed successfully!';
    } else {
      throw new Error('Failed to place order');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    throw new Error('An error occurred. Please try again.');
  }
};
