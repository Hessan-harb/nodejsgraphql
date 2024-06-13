const mongoose = require('mongoose');
const attributeItemSchema = require('./Attribute');

const attributeSetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    items: [attributeItemSchema]
});

module.exports = attributeSetSchema;
