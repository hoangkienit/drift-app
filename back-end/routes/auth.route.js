const express = require('express');
const { RegisterController } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/registration', RegisterController);

module.exports = router;