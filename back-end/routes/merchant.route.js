const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const MerchantController = require('../controllers/merchant.controller');


// CREATE NEW RESTAURANT || POST
router.post('/create-restaurant/:id',   MerchantController.createNewRestaurant);


module.exports = router;