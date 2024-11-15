const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

/**
 * Search using Google Custom Search API
 * @param {string} query - Search query
 * @returns {Promise} Search results
 */
export const searchItems = async (query) => {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }

    const data = await response.json();
    console.log('Google Search Results:', data);
    return data.items || []; // Google returns results in 'items' array
    
  } catch (error) {
    console.error('Google Search API error:', error);
    throw error;
  }
};