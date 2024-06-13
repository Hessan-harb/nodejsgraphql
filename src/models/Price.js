const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    currency_label: { type: String, required: true },
    currency_symbol: { type: String, required: true }
});

module.exports = priceSchema;
