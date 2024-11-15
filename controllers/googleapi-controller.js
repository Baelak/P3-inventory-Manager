const searchItems = require('../utils/searchService.js');
// import { searchItems } from '../utils/searchService'

module.exports = {
  async googleSearch(req, res) {
    const query = req.params.searchQuery.trim();
    console.log('Query is:', query);
    const allResults = await searchItems(query);

    if (!allResults) {
      return res.status(400).json({ message: 'No results found' });
    }
    res.status(200).json(allResults);
  },
};