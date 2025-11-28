const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number
    }
},
{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;