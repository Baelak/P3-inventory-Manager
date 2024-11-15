const router = require('express').Router();
const {
  googleSearch,
} = require('../controllers/googleapi-controller');

router.route('/').get(googleSearch);

module.exports = router;