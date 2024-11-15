// Utilizes the 'dotenv' package in order to load the .env file and sets the environment variables to the process.env object.
// import 'dotenv/config';
require('dotenv').config();

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.VITE_SEARCH_ENGINE_ID;

/**
 * Search using Google Custom Search API
 * @param {string} query - Search query
 * @returns {Promise} Search results
 */
module.exports = {
    searchItems: async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodedQuery}`;
    console.log('Google Search URL:', url);

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
}};