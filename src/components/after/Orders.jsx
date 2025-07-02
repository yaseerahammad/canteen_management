import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userKey, setUserKey] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.email) {
      const key = `orderHistory_${currentUser.email}`;
      const storedOrders = JSON.parse(localStorage.getItem(key)) || [];
      setOrders(storedOrders);
      setUserKey(key);
    }
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your order history?")) {
      localStorage.removeItem(userKey);
      setOrders([]);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <button className="clear-history-btn" onClick={handleClearHistory}>🗑️ Clear History</button>
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header">Order #{index + 1}</div>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Placed On:</strong> {order.time}</p>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
              <div className="order-total"><strong>Total:</strong> ₹{order.total}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;
