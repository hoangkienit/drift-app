const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    house_number: {
    type: String,
    required: true,
    trim: true,
    description: "House or building number (e.g., 123A, 45B)."
  },
  street_name: {
    type: String,
    required: true,
    trim: true,
    description: "Street name (e.g., Nguyễn Huệ, Lý Thường Kiệt)."
  },
  ward_commune: {
    type: String,
    required: true,
    trim: true,
    description: "Ward (Phường) or Commune (Xã) in urban and rural areas."
  },
  district: {
    type: String,
    required: true,
    trim: true,
    description: "District (Quận for urban areas, Huyện for rural areas)."
  },
  city: {
    type: String,
    required: true,
    trim: true,
    description: "City or municipality (e.g., TP. Hồ Chí Minh, Hà Nội)."
  },
  province: {
    type: String,
    trim: true,
    description: "Province name (only needed for areas outside major cities)."
  },
  country: {
    type: String,
    required: true,
    enum: ["Vietnam"],
      description: "Country name (fixed as 'Vietnam').",
    default: "Vietnam"
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90,
    description: "GPS latitude coordinate for precise location."
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180,
    description: "GPS longitude coordinate for precise location."
  },
  formatted_address: {
    type: String,
    description: "Full formatted address as a single string."
  }
}, { timestamps: true });

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    address: { type: addressSchema, required: true },
    logo: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/1995/1995478.png' },
    coverImage: { type: String, default: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/restaurant-2002917_1280.jpg' },
    category: { 
        type: String, 
        required: true, 
        enum: ['fast_food', 'casual_dining', 'fine_dining', 'cafe', 'bakery', 'other'], 
        default: 'other' 
    },
    revenue: {
      type: Number,
      default: 0
    },
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }],
    operatingHours: {
        open: { type: String, default: "08:00 AM" },
        close: { type: String,  default: "10:00 PM" }
    },
    paymentMethods: { 
        type: [String], 
        enum: ['cash', 'credit_card', 'momo', 'paypal'], 
        default: ['cash', 'credit_card'] 
    },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 0, max: 5 },
        comment: { type: String }
    }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    status: { type: String, enum: ['open', 'closed'], default: 'closed' },
    //isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Merchant', merchantSchema);
