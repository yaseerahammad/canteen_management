import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// BEFORE components
import NavbarBefore from './components/before/Navbar';
import HomeBefore from './components/before/Home';
import Register from './components/before/Register';
import SignIn from './components/before/SignIn';
import CartBefore from './components/before/Cart';
import MenuBefore from './components/before/Menu';
import ForgotPassword from './components/before/ForgotPassword';

// AFTER components
import NavbarAfter from './components/after/Navbar1';
import HomeAfter from './components/after/Home1';
import CartAfter from './components/after/Cart1';
import MenuAfter from './components/after/Menu1';
import Profile from './components/after/Profile';
import Orders from './components/after/Orders'; // ✅ Added Orders component

const AppContent = ({ userEmail, setUserEmail }) => {
  const location = useLocation();
  const isAfterRoute = location.pathname.startsWith('/after');

  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeFromCart = (item) => {
    setCart(prev => {
      if (!prev[item.id]) return prev;
      const newQty = prev[item.id].quantity - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }
      return {
        ...prev,
        [item.id]: {
          ...prev[item.id],
          quantity: newQty
        }
      };
    });
  };

  return (
    <>
      {isAfterRoute ? <NavbarAfter /> : <NavbarBefore />}

      <div className="app-container">
        <Routes>
          {/* BEFORE routes */}
          <Route path="/" element={<HomeBefore />} />
          <Route path="/menu/:filter?" element={<MenuBefore cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/cart" element={<CartBefore cart={cart} setCart={setCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<Register setUserEmail={setUserEmail} />} />

          {/* AFTER routes */}
          <Route path="/after/home" element={<HomeAfter />} />
          <Route path="/after/cart" element={<CartAfter cart={cart} setCart={setCart} />} />
          <Route path="/after/menu/:filter?" element={<MenuAfter cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/after/profile" element={<Profile email={userEmail} />} />
          <Route path="/after/orders" element={<Orders />} /> {/* ✅ Added Orders route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  const [userEmail, setUserEmail] = useState('');

  return (
    <Router>
      <AppContent userEmail={userEmail} setUserEmail={setUserEmail} />
    </Router>
  );
};

export default App;
