const FoodService = require("../services/food.service");
const ImageService = require('../services/image.service');
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
    static async getAllFoodsByMerchantId(req, res) {
        try {
            const { merchantId } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);

            const result = await FoodService.getAllFoodsByMerchantId({ merchantId, lang});

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

    // 🔹 Get Food By Id
    static async getFoodById(req, res) {
        try {
            const { foodId } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);

            const result = await FoodService.getFoodById({ foodId, lang});

            return res.status(201).json({
                success: true,
                message: "Successfully get food data",
                data: {
                    food: result
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
    
    // 🔹 Upload Food Avatar
    static async uploadFoodAvatar(req, res) {
            const { foodId } = req.params;
    
        try {
          if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
            }
    
            // // Fetch current user to get old avatar URL
            // const food = await FoodService.getFoodById(foodId);
            
            const imageUrl = await ImageService.processAndUploadAvatar(req.file, "restaurant_food", null);
    
            if (!imageUrl) {
                return res.status(500).json({ success: false, error: "Image upload failed" });
            }
    
          res.json({
            success: true,
            message: 'Image uploaded successfully!',
              data: {
                food_img: imageUrl
            },
          });
        } catch (error) {
            console.log("Error", error);
          res.status(500).json({ success: false, error: error.message });
        }
      }
}

module.exports = FoodController;