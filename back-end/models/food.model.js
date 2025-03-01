const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    },
    name: {
        type: String,
        required: true
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
        required: true
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'
    },
    availability: {
        type: Boolean,
        default: true
    },
    outOfStock: {
        type: Boolean,
        default: false
    },
    toppings: [{
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 }
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
