const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
});

const merchantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensures a vendor owns only one restaurant
    },
    address: {
        type: addressSchema,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/1995/1995478.png'
    },
    coverImage: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/restaurant-2002917_1280.jpg'
    },
    category: {
        type: String,
        required: true,
        enum: ['Fast Food', 'Casual Dining', 'Fine Dining', 'Cafe', 'Bakery', 'Other'],
        default: 'Other'
    },
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodItem'
        }
    ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
}, { timestamps: true });

module.exports = mongoose.model('Merchant', merchantSchema);
