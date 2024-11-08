const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require('./user-routes');
const userRoutes2 = require('../../controllers/api/userRoutes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);
router.use('/users2', userRoutes2)

module.exports = router;


//const router = require('express').Router();
// const categoryRoutes = require('./category-routes');
// const productRoutes = require('./product-routes');
// const tagRoutes = require('./tag-routes');
// const userRoutes = require("./user-routes")
// const userRoutes2 = require('../../controllers/api/userRoutes');

// router.use('/categories', categoryRoutes);
// router.use('/products', productRoutes);
// router.use('/tags', tagRoutes);
// router.use('/users', userRoutes);
// router.use('/users2', userRoutes2)

// module.exports = router;
