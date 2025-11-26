const express = require('express');
const { productController } = require('../controllers/productController');
const { productValidations } = require('../validations/productValidatiors');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const router = express.Router();


router.get('/',productValidations.getAllProductsValidatior,  productController.getAll);
router.get('/:id', productValidations.getByIdProductValidatior, validationErrorHandler, productController.getById);
router.post('/', productController.create);

module.exports = router;

