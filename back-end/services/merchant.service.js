const Merchant = require("../models/merchant.model");
const getMessage = require("../utils/getMessage");
const axios = require('axios')


class MerchantService {
    static async createRestaurant({ id , lang}, data) {
        const query = `${data.houseNumber} ${data.streetName}, Phường ${data.selectedWard}, ${data.selectedDistrict}, ${data.selectedCity}`;

        // Check restaurant exist
        const existedRestaurantName = await Merchant.findOne({ name: data.restaurantName });
        if (existedRestaurantName) {
            console.log(existedRestaurantName);
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
}

module.exports = MerchantService;
