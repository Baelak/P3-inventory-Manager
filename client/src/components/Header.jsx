import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import appLogo from '../assets/logo/app-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo-container">
          <img src={appLogo} alt="app-logo" className="logo" />
        </div>
        <h2 className="welcome-text">Welcome to KiM Inventory Manager</h2>
        <button className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link to="/inventory" onClick={toggleMenu}>
            Inventory
          </Link>
          {Auth.loggedIn() ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;