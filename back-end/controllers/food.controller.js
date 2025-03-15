const FoodService = require("../services/food.service");
const getLanguage = require("../utils/getLanguage");

class FoodController {
    // 🔹 Add New Food
    static async addNewFood(req, res) {
        try {
            const { merchantId } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);

            const { name, description, price, image, category } = req.body;
            // TODO: VALIDATE THE INPUT
            // TODO: name: only word
            // TODO: description: only word
            // TODO: price: must be greater than 0
            // TODO: image: validate any specific character like # $() ! to protect db
            // TODO: category: mus be in 6 category

            const result = await FoodService.addNewFood({ merchantId, lang, name, description, price, image, category });

            return res.status(201).json({
                success: true,
                message: "Successfully created new food",
                data: {
                    foods: result
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

    // 🔹 Get All Foods
    static async getAllFoods(req, res) {
        try {
            const { merchantId } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);

            const result = await FoodService.getAllFoods({ merchantId, lang});

            return res.status(201).json({
                success: true,
                message: "Successfully get all food of merchant",
                data: {
                    foods: result
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

module.exports = FoodController;