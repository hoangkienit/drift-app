const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
    items: [{
        food: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryAddress: { type: mongoose.Schema.Types.Mixed, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: { type: String, enum: ['cash', 'credit_card', 'momo', 'paypal'], default: 'cash' },
    estimatedDeliveryTime: { type: Date },
    tracking: [{
        status: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
