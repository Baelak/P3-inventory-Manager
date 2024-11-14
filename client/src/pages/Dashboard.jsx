import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // This will be connected to API later
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="dashboard-container">
      <main>
        {/* Header Section */}
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Welcome to KIM Inventory Manager Dashboard!</p>
        </div>

        {/* Search Section */}
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, services, suppliers..."
              />
              <button type="submit">Search</button>
            </div>
            <p className="search-hint">
              Search for products, services, suppliers and more 🔍
            </p>
          </form>
        </div>

        {/* Navigation Section */}
        <div className="nav-links">
          <Link to="/inventory">Go to Inventory</Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;