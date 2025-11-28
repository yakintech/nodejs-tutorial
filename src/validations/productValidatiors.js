const { body, param, query } = require('express-validator');

const isObjectId = (value) => /^[a-fA-F0-9]{24}$/.test(String(value || ''));


const productValidations = {
    getById: [
        param('id').exists().withMessage('id gerekli').bail().custom(isObjectId).withMessage('id geçersiz'),
    ],
    getAll: [
        query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
        query('limit').optional().isInt({ min: 1 }).withMessage('limit must be a positive integer'),
        query('orderBy').optional().isString().withMessage('orderBy must be a string'),
        query('orderType').optional().isIn(['asc', 'desc']).withMessage('orderType must be either asc or desc'),
    ],
    create : [
        body('name').exists().withMessage('name gerekli').bail().isString().withMessage('name must be a string'),
        body('category').exists().withMessage('category gerekli').bail().custom(isObjectId).withMessage('category geçersiz'),
        body('price').exists().withMessage('price gerekli').bail().isFloat({ gt: 0 }).withMessage('price must be a number greater than 0'),
    ],
    update: [
        param('id').exists().withMessage('id gerekli').bail().custom(isObjectId).withMessage('id geçersiz'),
        body('name').optional().isString().withMessage('name must be a string'),
        body('category').optional().custom(isObjectId).withMessage('category geçersiz'),
        body('price').optional().isFloat({ gt: 0 }).withMessage('price must be a number greater than 0'),
    ],
    delete: [
        param('id').exists().withMessage('id gerekli').bail().custom(isObjectId).withMessage('id geçersiz'),
    ]
}



module.exports = {
    productValidations
};