const router = require('express').Router();
const googleApiRoutes = require('./googleapi-routes');

router.use('/googleapi', googleApiRoutes);

module.exports = router;