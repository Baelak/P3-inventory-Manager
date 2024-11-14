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
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
      </nav>
    </header>
  );
};

export default Header;
