// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.String, // Assuming product IDs are stored as strings
        ref: 'Product'
    }],    
    totalAmount: { type: Number, required: true } // Ensure totalAmount is a Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
