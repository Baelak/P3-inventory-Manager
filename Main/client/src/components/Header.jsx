// File: client/src/components/Header.js  <img src='/images/logo.png' alt='application-logo'/>
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>
        
        KIM INVENTORY MANAGER</h1>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
};

export default Header;
