const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const UploadMiddleware = require('../middlewares/upload.middleware');

// GET ALL USER || GET
router.get('/users', authMiddleware, UserController.getUsers);

// GET USER BY ID || GET
router.get("/get/:id", authMiddleware, UserController.getUserById);

// UPDATE USER INFORMATION || PUT
router.put("/update-user/:id", authMiddleware,  UserController.updateUser);

// UPDATE USER PASSWORD BY ID || PUT
router.put("/update-password/:id", authMiddleware, UserController.updatePassword);

// RESET USER PASSWORD || PUT

// UPDATE USER AVATAR || PUT
router.put('/update-avatar/:id', authMiddleware, UploadMiddleware.upload.single('avatar'), UserController.uploadAvatar);

module.exports = router;