// File: client/src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <main>
      <h2>Dashboard</h2>
      <p>Welcome to the Inventory Management Dashboard!</p>
      <Link to="/inventory">Go to Inventory</Link>
    </main>
  );
};

export default Dashboard;
