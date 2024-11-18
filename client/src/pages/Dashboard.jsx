import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="dashboard">
      <main>
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Welcome to KIM Inventory Manager Dashboard!</p>
        </div>

        <SearchBox onSearch={handleSearchResults} />

        <div className="nav-links">
          <Link to="/inventory" className='btn-secondary'>Go to Inventory</Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;