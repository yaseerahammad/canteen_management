import React, { useState } from 'react';
import './Cart.css';

const CartPage = ({ cart, setCart }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  const handleRemove = (id) => {
    const updated = { ...cart };
    delete updated[id];
    setCart(updated);
  };

  const handlePlaceOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
    setOrderDetails({
      orderId,
      time: new Date().toLocaleString(),
      items: Object.values(cart),
      total: Object.values(cart).reduce((sum, i) => sum + i.price * i.quantity, 0)
    });
    setCart({});
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {orderDetails ? (
        <div className="order-confirmation">
          <h3>✅ Order Placed Successfully!</h3>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Time:</strong> {orderDetails.time}</p>
          <ul>
            {orderDetails.items.map(item => (
              <li key={item.id}>
                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total Paid: ₹{orderDetails.total}</h4>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(cart).map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                  <td><button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Total: ₹{Object.values(cart).reduce((sum, i) => sum + i.price * i.quantity, 0)}</h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
