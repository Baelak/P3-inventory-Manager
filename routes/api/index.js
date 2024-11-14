const router = require('express').Router();
// const categoryRoutes = require('./category-routes');
const inventoryRoutes = require('../../controllers/api/inventoryRoutes');
// const productRoutes = require('./product-routes');
// const tagRoutes = require('./tag-routes');
// const userRoutes = require("./user-routes")
const userRoutes = require('../../controllers/api/userRoutes');

// router.use('/categories', categoryRoutes);
router.use('/categories', inventoryRoutes);
router.use('/products', inventoryRoutes);
router.use('/tags', inventoryRoutes);
router.use('/users', userRoutes);

module.exports = router;