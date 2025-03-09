const getMessage = require("../utils/getMessage");

// Models
const Order = require("../models/order.model");


class OrderService {   
    static async getRecentOrders({ merchantId, lang }) {
        const recentOrders = await Order.find({ merchant: merchantId })
            .sort({ createdAt: -1 }) // Sort by latest created
            .limit(8) // Limit to 8 orders
            .populate('user', 'name email') // Include user name & email
            .populate('merchant', 'name') // Include merchant name
            .populate('items.food', 'name price'); // Include food item name & price

        if (!recentOrders) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }

        return recentOrders;
    }
}

module.exports = OrderService;