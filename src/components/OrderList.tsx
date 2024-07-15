import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/OrderList.scss';
import { Order } from '../types/index';
import { fetchOrders } from '../services/dataService';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <div className="order-list-section">
      <h1>Order List</h1>
      <ul className="order-list">
        {orders.map(order => (
          <li key={order.id} className="order-item">
            <Link to={`/order/${order.id}`} className="order-link">
              <div className="order-info">
                <div className="order-id">Order ID: {order.id}</div>
                <div className='total'>Total: ${order.total}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
