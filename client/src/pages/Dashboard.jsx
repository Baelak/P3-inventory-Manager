import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import '../styles/dashboard.css'

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="dashboard-container">
      <main>
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>

        <SearchBox onSearch={handleSearchResults} />
        <h3>Search products, services, suppliers...</h3>
        {/* Display Results */}
        {searchResults.length > 0 && (
          <div className="results-section">
            <h3>Search Results</h3>
            <div className="results-list">
              {searchResults.map((result, index) => (
                <div key={index} className="result-item">
                  <h4>{result.title}</h4>
                  <p>{result.snippet}</p>
                  {result.link && (
                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                      View More
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="nav-links">
          <Link to="/inventory">Go to Inventory</Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;