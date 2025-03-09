const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const MerchantController = require('../controllers/merchant.controller');


// CREATE NEW RESTAURANT || POST
router.post('/create-restaurant/:id', authMiddleware, MerchantController.createNewRestaurant);

// GET RESTAURANT BY USER ID || GET
router.get('/restaurant/:id', authMiddleware, MerchantController.getRestaurant);

// GET ALL RESTAURANT || GET
router.get('/restaurants',   MerchantController.getAllRestaurants);


module.exports = router;