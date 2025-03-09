const MerchantService = require("../services/merchant.service");
const getLanguage = require("../utils/getLanguage");
const { updateInformationValidation, updatePasswordValidation } = require("../utils/validation");

class MerchantController {
    // 🔹 Create New Restaurant
    static async createNewRestaurant(req, res) {
        try {
            const {
                restaurantName,
                restaurantDescription,
                selectedCategory,
                houseNumber,
                streetName,
                selectedCity,
                selectedDistrict,
                selectedWard
            } = req.body;

            const { id } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);

            // TODO: VALIDATE THE INPUT
            const result = await MerchantService.createRestaurant({ id , lang}, req.body);

            return res.status(200).json({
                success: true,
                message: "Successfully create new merchant",
                data: {
                    merchant: result
                }
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // 🔹 Get Restaurant By ID
    static async getRestaurant(req, res) {
        try {
            const { id } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);
            // TODO: VALIDATE THE INPUT
            const result = await MerchantService.getRestaurant({ id , lang});

            return res.status(200).json({
                success: true,
                message: "Successfully get restaurant data",
                data: {
                    restaurant: result
                }
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // 🔹 Get All Restaurants
    static async getAllRestaurants(req, res) {
        try {
            const { id } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);
            // TODO: VALIDATE THE INPUT
            const result = await MerchantService.getAllRestaurants({lang});

            return res.status(200).json({
                success: true,
                message: "Successfully get restaurants",
                data: {
                    restaurants: result
                }
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


}

module.exports = MerchantController;