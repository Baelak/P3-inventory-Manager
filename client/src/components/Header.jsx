// File: client/src/components/Header.js  ⋊⋋⋌ ⁱ⋇⨉⨭⨰⨨⩒⫯ϔ ⁜▩ ⋉ ⋮⋀⋀⩑⩑⩚⩞⩞iM  ≺ ⊹KiM   ⫷iM  ⁜ KiM  ⋉iM  ⇝kiM   ▩KiM   ▶iM    ▷KiM ⋰    |⪛iM      ⫹iM   ϏiM(
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import appLogo from '../assets/logo/app-logo.png'
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
        <img src={appLogo} alt="app-logo" />
        <h2>Welcome to KiM invenetory Manager</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
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