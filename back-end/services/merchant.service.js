const getMessage = require("../utils/getMessage");
const axios = require('axios')

// Models
const Merchant = require("../models/merchant.model");
const User = require("../models/user.model");


class MerchantService {
    static async createRestaurant({ id, lang }, data) {
        const user = await User.findOne({_id: id});
        if (!user) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }

        const query = `${data.houseNumber} ${data.streetName}, Phường ${data.selectedWard}, ${data.selectedDistrict}, ${data.selectedCity}`;

        // Check restaurant exist
        const existedRestaurantName = await Merchant.findOne({ name: data.restaurantName });
        if (existedRestaurantName) {
            throw new Error(getMessage("RESTAURANT_ALREADY_EXISTED", lang));
        }
        
        const location = await MerchantService.searchLocation(query, lang);

        //Create new merchant
        const newMerchant = new Merchant({
            name: data.restaurantName,
            description: data.restaurantDescription,
            owner: id, // User ID
            address: {
                house_number: data.houseNumber,
                street_name: data.streetName,
                ward_commune: `Phường ${data.selectedWard}`,
                district: data.selectedDistrict,
                city: data.selectedCity,
                country: "Vietnam",
                latitude: location.latitude,
                longitude: location.longitude,
                formatted_address: query
            },
            logo: "https://cdn-icons-png.flaticon.com/512/1995/1995478.png",
            coverImage: "https://cdn.pixabay.com/photo/2017/01/22/19/20/restaurant-2002917_1280.jpg",
            category: data.selectedCategory,
            foods: [], // Add food IDs if available
            rating: 0,
            status: "closed"
        });

        const savedMerchant = await newMerchant.save();

        // Save restaurant data to it owner
        user.restaurant = savedMerchant._id;
        await user.save();
        return savedMerchant;
    }
    static async searchLocation(query, lang) {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;
            const response = await axios.get(url);
            if (response.data.features.length === 0) {
                throw new Error(getMessage("NOT_FOUND_LOCATION_ERROR", lang));
            }
            const location = response.data.features[0]; // Get first result
            
            return {
                place_name: location.place_name,
                longitude: location.center[0], // lng
                latitude: location.center[1], // lat
            };
        } catch (error) {
            console.error("Error fetching location:", error.message);
            throw new Error(getMessage("FETCH_LOCATION_ERROR", lang));
        }
    }

    static async getRestaurant({ id, lang }) {
        // Fetch the restaurant directly by joining User and Merchant
        const userWithRestaurant = await User.findOne({ _id: id }).populate('restaurant'); 

        if (!userWithRestaurant) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }

        return userWithRestaurant.restaurant;
    }

    static async getAllRestaurants({ lang }) {
        const restaurants = await Merchant.find();

        if (!restaurants) {
            throw new Error('No restaurant data');
        }

        return restaurants;
    }
}

module.exports = MerchantService;
