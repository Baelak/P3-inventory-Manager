// File: client/src/components/Header.js  <img src='/images/logo.png' alt='application-logo'/>
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <h1>
        
        KIM INVENTORY MANAGER</h1>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/inventory">Inventory</Link>
        {Auth.loggedIn() ? (
            <button onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>
              <Link to="/signup">
                Signup
              </Link>
            </>
          )}
      </nav>
    </header>
  );
};

export default Header;
