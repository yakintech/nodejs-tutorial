const express = require('express');
const router = express.Router();

const productRoutes = require('./product');
const categoryRoutes = require('./category');



router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);


module.exports = router;