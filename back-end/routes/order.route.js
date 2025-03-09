const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const OrderController = require('../controllers/order.controller');



// GET RECENT ORDER || GET
router.get('/recent-orders/:merchantId',   OrderController.getRecentOrders);


module.exports = router;