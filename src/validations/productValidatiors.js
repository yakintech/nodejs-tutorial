const { body, param, query } = require('express-validator');

const isObjectId = (value) => /^[a-fA-F0-9]{24}$/.test(String(value || ''));


const productValidations = {
    getByIdProductValidatior: [
        param('id').exists().withMessage('id gerekli').bail().custom(isObjectId).withMessage('id geçersiz'),
    ],

    getAllProductsValidatior: [
        query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
        query('limit').optional().isInt({ min: 1 }).withMessage('limit must be a positive integer'),
        query('orderBy').optional().isString().withMessage('orderBy must be a string'),
        query('orderType').optional().isIn(['asc', 'desc']).withMessage('orderType must be either asc or desc'),
    ]

}



module.exports = {
    productValidations
};