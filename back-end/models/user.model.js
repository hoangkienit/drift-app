const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        required: true,
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profileImg: {
        type: String,
        default: 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png'
    },
    status: {
        type: String,
        enum: ['active', 'in-active'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);