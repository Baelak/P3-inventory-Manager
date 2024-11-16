import React, { useState, useEffect } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Add check for environment variables
  useEffect(() => {
    console.log('API Key exists:', !!import.meta.env.VITE_GOOGLE_API_KEY);
    console.log('Search Engine ID exists:', !!import.meta.env.VITE_SEARCH_ENGINE_ID);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const GOOGLE_API_KEY =  import.meta.env.VITE_GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

    // Validate API credentials
    if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
      setError('Search configuration is missing. Please check environment variables.');
      console.error('Missing API credentials:', {
        hasApiKey: !!GOOGLE_API_KEY,
        hasSearchEngineId: !!SEARCH_ENGINE_ID
      });
      return;
    }

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchQuery)}`;
    console.log('Search URL (without key):', searchUrl.replace(GOOGLE_API_KEY, 'HIDDEN_KEY'));

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(searchUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Google API response:', data);

      if (data.items) {
        setSearchResults(data.items);
        if (onSearch) {
          onSearch(data.items);
        }
      } else {
        setSearchResults([]);
        setError('No results found');
      }

    } catch (err) {
      setError(`Search failed: ${err.message}`);
      console.error('Search error:', err);
      setSearchResults([]);
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
        
        {isLoading && <p>Loading results...</p>}
        
        {!isLoading && searchResults.length > 0 && (
          <div className="search-results">
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
        )}
      </form>
    </div>
  );
};

export default SearchBox;