const express = require('express');
const { getAllProducts } = require('../controllers/productController');
const router = express.Router();


router.get('/', getAllProducts);




router.get('/:id', (req, res) => {
    const productId = req.params.id;
    res.send(`Product Details for ID: ${productId}`);
});

module.exports = router;

