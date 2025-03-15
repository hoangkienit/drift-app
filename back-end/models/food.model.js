const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['appetizer', 'main_course', 'dessert', 'drink', 'other'],
        default: 'other'
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/1046/1046750.png'
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    toppings: [toppingSchema], // Embedded toppings
    isCustomizable: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodItemSchema);
