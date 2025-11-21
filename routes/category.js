const express = require('express');
const router = express.Router();


router.get('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    // Logic to fetch and return category details based on categoryId
    res.send(`Category details for ID: ${categoryId}`);
});

module.exports = router;