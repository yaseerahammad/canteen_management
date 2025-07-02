import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar1.css';

const Navbar1 = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      navigate(`/after/menu/${value}`);
    } else {
      navigate('/after/menu');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/after/menu?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/after/menu');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleOrdersClick = () => {
    navigate('/after/orders');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/after/home" className="logo">MITS Canteen</Link>
          <Link to="/after/home" className="nav-link">Home</Link>
          <Link to="/after/menu" className="nav-link">Menu</Link>
          <Link to="/after/cart" className="nav-link">Cart 🛒</Link>
        </div>

        <div className="navbar-search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          <select
            className="filter-dropdown"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">▼ Filter</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Drinks">Drinks</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        <div className="navbar-right">
          <button className="profile-btn" onClick={toggleSidebar}>👤 Profile</button>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar">
          <button onClick={() => navigate('/after/profile')} className="sidebar-link">My Profile</button>
          <button onClick={handleOrdersClick} className="sidebar-link">Orders</button>
          <button onClick={handleLogout} className="sidebar-link">Logout</button>
        </div>
      )}
    </>
  );
};

export default Navbar1;
