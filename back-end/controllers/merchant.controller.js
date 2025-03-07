const MerchantService = require("../services/merchant.service");
const { updateInformationValidation, updatePasswordValidation } = require("../utils/validation");

class MerchantController {
    // 🔹 Get All Users
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
            const result = await MerchantService.createRestaurant(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Successfully create new merchant",
                data: {
                    merchant: result
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = MerchantController;