const getMessage = require("../utils/getMessage");

// Models
const Food = require("../models/food.model");
const Merchant = require("../models/merchant.model");

class FoodService {   
    static async addNewFood({ merchantId, lang, name, description, price, image, category }) {
        const merchant = await Merchant.findById(merchantId);

        // 🛑 Check if merchant exists
        if (!merchant) {
            throw new Error("Merchant not found");
        }

        // ✅ Use default image if none is provided
        const defaultImg = "https://www.opentable.com/img/restimages/1884.jpg";
        const finalImg = image || defaultImg;

        // ✅ Create the food item
        const newFood = await Food.create({
            name,
            description,
            price,
            category,
            image: finalImg,
            merchant: merchantId,
        });

        // ✅ Push the new food ID directly into the merchant's `foods` array
        await Merchant.findByIdAndUpdate(merchantId, { 
            $push: { foods: newFood._id } 
        });

        const updatedMerchant = await Merchant.findById(merchantId)
        .populate("foods")
        .select("foods")
        .lean();

        return updatedMerchant.foods;
    }

    static async getAllFoodsByMerchantId({ merchantId, lang }) {
        const merchant = await Merchant.findById(merchantId)
            .populate("foods")
            .select("foods")
            .lean();

        if (!merchant) {
            throw new Error("Merchant not found");
        }

        return merchant.foods;
    }

    static async getFoodById({ foodId, lang }) {
        const food = await Food.findById(foodId)
            .lean();

        if (!food) {
            throw new Error("Food not found");
        }

        return food;
    }

    static async updateFoodAvatar({ id, imageUrl }) {
        const food = await Food.findByIdAndUpdate(
            id,
            { $set: { image: imageUrl } },  // ✅ Ensure avatar field is updated
            { new: true }
        );
    
        if (!food) {
            console.error("Failed to update food avatar. Food not found.");
            return null;
        }
    
        return [];
    }
}

module.exports = FoodService;
