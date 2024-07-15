import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OrderDetail.scss';
import CustomModal from './common/Modal';
import { Product, Order, OrderItem } from '../types/index';
import { fetchOrderDetail, fetchProducts, placeOrder } from '../services/dataService';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [newItem, setNewItem] = useState<OrderItem>({ 'product-id': '', quantity: '', 'unit-price': '', total: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail(orderId)
        .then(data => setOrder(data))
        .catch(error => console.error('Error fetching order:', error));
    }

    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [orderId]);

  const handleRemoveItem = useCallback((productId: string) => {
    if (order) {
      const updatedItems = order.items.filter(item => item['product-id'] !== productId);
      const updatedOrder = {
        ...order,
        items: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2)
      };
      setOrder(updatedOrder);
    }
  }, [order]);

  const openModal = useCallback(() => {
    setNewItem({ 'product-id': '', quantity: '', 'unit-price': '', total: '' });
    setIsProductSelected(false);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setQuantityError(null);
  }, []);

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewItem({ ...newItem, quantity: value });
    if (parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
      setQuantityError('Quantity must be greater than 0.');
    } else {
      setQuantityError(null);
    }
  }, [newItem]);

  const handleSubmit = useCallback(() => {
    if (order && newItem['product-id'] && newItem.quantity && newItem['unit-price'] && !quantityError) {
      const parsedQuantity = parseFloat(newItem.quantity);
      const itemTotal = (parsedQuantity * parseFloat(newItem['unit-price'])).toFixed(2);

      const itemIndex = order.items.findIndex(item => item['product-id'] === newItem['product-id']);
      if (itemIndex !== -1) {
        const updatedItems = order.items.map((item, index) => {
          if (index === itemIndex) {
            const updatedQuantity = parseFloat(item.quantity) + parsedQuantity;
            const updatedTotal = (updatedQuantity * parseFloat(item['unit-price'])).toFixed(2);
            return { ...item, quantity: updatedQuantity.toString(), total: updatedTotal };
          }
          return item;
        });
        const updatedOrder = {
          ...order,
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2)
        };
        setOrder(updatedOrder);
      } else {
        const updatedOrder = {
          ...order,
          items: [...order.items, { ...newItem, total: itemTotal }],
          total: (parseFloat(order.total) + parseFloat(itemTotal)).toFixed(2)
        };
        setOrder(updatedOrder);
      }

      setNewItem({ 'product-id': '', quantity: '', 'unit-price': '', total: '' });
      setIsModalOpen(false);
      setQuantityError(null);
    }
  }, [order, newItem, quantityError]);

  const handleCancel = useCallback(() => {
    console.log('Cancelled');
    setIsModalOpen(false);
    setQuantityError(null);
  }, []);

  const isSubmitDisabled = useMemo(() => {
    return !(newItem['product-id'] && newItem.quantity && !quantityError);
  }, [newItem, quantityError]);

  const handlePlaceOrder = useCallback(() => {
    if (order) {
      placeOrder(order)
        .then(message => setConfirmationMessage(message))
        .catch(error => setConfirmationMessage(error.message));
    }
  }, [order]);

  const orderItems = useMemo(() => (
    order?.items.map(item => (
      <li key={item['product-id']}>
        <div>Product ID: {item['product-id']}</div> 
        <div>Quantity: {item.quantity}</div>
        <div>Unit Price: ${item['unit-price']}</div>
        <div>Total: ${item.total}</div>
        <button
          className="btn btn-remove"
          onClick={() => handleRemoveItem(item['product-id'])}
          aria-label={`Remove item with Product ID ${item['product-id']}`}
        >
          Remove
        </button>
      </li>
    ))
  ), [order, handleRemoveItem]);

  return (
    <div className="order-detail-container">
      {order ? (
        <>
          <h1>Order Detail for Order ID: {order.id}</h1>
          <h2>Customer ID: {order['customer-id']}</h2>
          <h3>Items:</h3>
          <ul>
            {orderItems}
          </ul>
          <h3>Total: ${order.total}</h3>
          <button
            className="add-item"
            onClick={openModal}
            aria-label="Add item"
          >
            Add item
          </button>
          <button
            className="place-order"
            onClick={handlePlaceOrder}
            aria-label="Place order"
          >
            Place Order
          </button>
        </>
      ) : (
        <p>Loading order details...</p>
      )}

      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title="Add item"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitDisabled={isSubmitDisabled}
      >
        <label htmlFor="product-dropdown" className="visually-hidden">Select Product</label>
        <select
          id="product-dropdown"
          className="product-dropdown"
          value={newItem['product-id']}
          onChange={e => {
            const selectedProduct = products.find(product => product.id === e.target.value);
            setNewItem({
              ...newItem,
              'product-id': e.target.value,
              'unit-price': selectedProduct ? selectedProduct.price : '',
            });
            setIsProductSelected(true);
          }}
          aria-required="true"
        >
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.description} (${product.price})
            </option>
          ))}
        </select>
        <div className="quantity">
          {isProductSelected && (
            <>
              <label htmlFor="quantity" className="visually-hidden">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityChange}
                aria-required="true"
              />
              {quantityError && <p className="quantity-error">{quantityError}</p>}
            </>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default React.memo(OrderDetail);
