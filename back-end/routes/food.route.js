const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const FoodController = require('../controllers/food.controller');



// GET ALL FOODS || GET
router.get('/get-foods/:merchantId', FoodController.getAllFoods);

// ADD NEW FOOD || POST
router.post('/add-food/:merchantId', FoodController.addNewFood);


module.exports = router;