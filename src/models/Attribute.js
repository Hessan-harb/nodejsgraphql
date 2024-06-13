const mongoose = require('mongoose');

const attributeItemSchema = new mongoose.Schema({
    displayValue: { type: String, required: true },
    value: { type: String, required: true }
});

module.exports = attributeItemSchema;
