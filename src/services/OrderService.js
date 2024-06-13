// services/OrderService.js

const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderService {
    async create(productIds) {
        try {
            let products = [];
            let totalAmount = 0;

            // Retrieve products and calculate total amount
            for (const productId of productIds) {
                const product = await this.findProductById(productId);
                if (product) {
                    products.push(product.id); // Store product id in order
                    if (product.prices && product.prices.length > 0) {
                        totalAmount += product.prices[0].amount; // Assuming only one price per product for simplicity
                    } else {
                        throw new Error(`Product price not found or invalid for ID: ${productId}`);
                    }
                } else {
                    throw new Error(`Product not found for ID: ${productId}`);
                }
            }

            if (isNaN(totalAmount)) {
                throw new Error('Total amount calculated as NaN');
            }

            // Create an order in the database
            const order = new Order({
                products: products,
                totalAmount: totalAmount
            });

            const savedOrder = await order.save();

            // Fetch the order with populated products
            const populatedOrder = await this.find(savedOrder._id);

            return populatedOrder;
        } catch (error) {
            throw new Error(`Order creation failed: ${error.message}`);
        }
    }

    async find(id) {
        try {
            const order = await Order.findById(id).populate('products');
            if (!order) {
                throw new Error(`Order not found for ID: ${id}`);
            }
            return order;
        } catch (error) {
            throw new Error(`Order retrieval failed: ${error.message}`);
        }
    }

    async findProductById(id) {
        try {
            const product = await Product.findOne({ id: id }); // Use findOne with string ID
            if (!product) {
                throw new Error(`Product not found for ID: ${id}`);
            }
            return product;
        } catch (error) {
            throw new Error(`Product retrieval failed for ID: ${id}: ${error.message}`);
        }
    }
}

module.exports = OrderService;
