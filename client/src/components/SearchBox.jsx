import React, { useState } from 'react';
import { searchItems } from '../services/searchService';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const results = await searchItems(searchQuery);
      console.log('Search results:', results);
      // You can add a callback prop here to send results back to parent component
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, services, suppliers..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !searchQuery.trim()}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <p className="search-hint">
          Search for products, services, suppliers and more 🔍
        </p>
      </form>
    </div>
  );
};

export default SearchBox;