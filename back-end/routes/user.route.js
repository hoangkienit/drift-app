const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// GET ALL USER || GET
router.get('/users', authMiddleware, UserController.getUsers);

// GET USER BY ID || GET
router.get("/get/:id", authMiddleware, UserController.getUserById);

// UPDATE USER PASSWORD BY ID || PUT

// RESET USER PASSWORD || PUT

module.exports = router;