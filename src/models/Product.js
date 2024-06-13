const mongoose = require('mongoose');
const priceSchema = require('./Price');
const attributeSetSchema = require('./AttributeSet');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Ensure this is a String type
    name: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    gallery: [String],
    description: { type: String, required: true },
    category: { type: String, required: true },
    attributes: [attributeSetSchema],
    prices: [priceSchema],
    brand: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// module.exports = productSchema;
