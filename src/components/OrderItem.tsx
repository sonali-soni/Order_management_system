import React from 'react';
import { Product } from '../types';

interface OrderItemProps {
  item: Product;
  onRemove: (id: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(item.id);
  };

  return (
    <div className="order-item">
      <span className="item-description">{item.description} - ${parseFloat(item.price).toFixed(2)}</span>
      <button className="remove-button" onClick={handleRemoveClick} aria-label={`Remove ${item.description}`}>
        Remove
      </button>
    </div>
  );
};

export default OrderItem;
