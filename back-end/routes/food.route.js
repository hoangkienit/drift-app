const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const UploadMiddleware = require('../middlewares/upload.middleware');
const FoodController = require('../controllers/food.controller');



// GET ALL FOODS OF MERCHANT || GET
router.get('/get-foods/:merchantId', authMiddleware, FoodController.getAllFoodsByMerchantId);

// ADD NEW FOOD || POST
router.post('/add-food/:merchantId', authMiddleware, FoodController.addNewFood);

// UPLOAD FOOD AVATAR || POST
router.post('/upload-food-avatar', authMiddleware, UploadMiddleware.upload.single('avatar'), FoodController.uploadFoodAvatar);


module.exports = router;