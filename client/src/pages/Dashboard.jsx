import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
//import { searchItems } from '../../../utils/searchService';

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (query) => {
    try {
      setIsSearching(true);
      setSearchError(null);
      const results = await searchItems(query);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      setSearchError('Failed to perform search. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
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
        <SearchBox onSearch={handleSearch} isLoading={isSearching} />

        {/* Search Results */}
        <div className="search-results">
          {searchError && (
            <p className="error-message">{searchError}</p>
          )}
          
          {isSearching ? (
            <p>Searching...</p>
          ) : searchResults.length > 0 ? (
            <div className="results-container">
              {searchResults.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.title}</h3>
                  <p>{result.snippet}</p>
                  {result.link && (
                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                      Learn more
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="search-hint">
              Search for products, services, suppliers and more 🔍
            </p>
          )}
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