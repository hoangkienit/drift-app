const getMessage = require("../utils/getMessage");

// Models
const Food = require("../models/food.model");
const Merchant = require("../models/merchant.model");


class FoodService {   
    static async addNewFood({ merchantId, lang, name, description, price, image, category }) {
        const merchant = await Merchant.findOne({_id: merchantId });
        
        // 🛑 Check if merchant exist
        if (!merchant) {
            throw new Error("Merchant not found");
        }
        
        const newFood = await Food.create({
            name,
            description,
            price,
            category,
            image,
            merchant: merchantId
        });

        // ✅ Add the food ID to the Merchant's foods array
        merchant.foods.push(newFood._id);
        await merchant.save(); // Save changes to DB


        return merchant.foods;
    }

    static async getAllFoods({ merchantId, lang }) {
        const merchant = await Merchant.findOne({_id: merchantId }).populate("foods");
        
        // 🛑 Check if merchant exist
        if (!merchant) {
            throw new Error("Merchant not found");
        }
        
        return merchant.foods;
    }
}

module.exports = FoodService;