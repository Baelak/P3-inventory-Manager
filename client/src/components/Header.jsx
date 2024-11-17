// File: client/src/components/Header.js   ⋊⋋⋌ ⁱ⋇⨉⨭⨰⨨⩒⫯ϔ ⁜▩ ⋉ ⋮⋀⋀⩑⩑⩚⩞⩞iM  ≺ ⊹KiM   ⫷iM  ⁜ KiM  ⋉iM  ⇝kiM   ▩KiM   ▶iM    ▷KiM ⋰    |⪛iM      ⫹iM   ϏiM(
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
      <h1>⨮⋮⨭</h1>
      <h2>K⋮M</h2>
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
