import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value) {
      navigate(`/menu/${value}`);
    } else {
      navigate('/menu');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/menu?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">MITS Canteen</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/cart" className="nav-link">Cart 🛒</Link>
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
        <Link to="/register">
          <button className="btn">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-outline">Log In</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
