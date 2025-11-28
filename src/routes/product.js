const express = require('express');
const { productController } = require('../controllers/productController');
const { productValidations } = require('../validations/productValidatiors');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const router = express.Router();


router.get('/', productValidations.getAll, validationErrorHandler, productController.getAll);
router.get('/:id', productValidations.getById, validationErrorHandler, productController.getById);
router.post('/', productValidations.create, validationErrorHandler, productController.create);
router.put('/:id', productValidations.update, validationErrorHandler, productController.update);
router.delete('/:id', productValidations.delete, validationErrorHandler, productController.delete);

module.exports = router;

