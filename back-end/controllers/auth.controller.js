const { loginValidation, registerValidation } = require("../utils/validation");
const User = require('../models/user.model');
const getMessage = require("../utils/getMessage");

const RegisterController = async (req, res) => { 
    try {
        const { username, phone, password } = req.body;
        const lang = req.headers['accept-language'];

        //Validation
        const { error } = registerValidation(req.body, lang);
        if (error) return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
        
        // 🛑 Check if phone exists
        const existUser = await User.findOne({ phone });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: getMessage("USER_EXISTS", lang)
            });
        }

        // ✅ Create User
        await User.create({ username, phone, password });

        return res.status(201).json({
            success: true,
            message: getMessage("SIGNUP_SUCCESS", lang)
        });

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: getMessage("REGISTRATION_ERROR", lang)
        });
    }
};

const LoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const lang = req.headers['accept-language'];

        // Validation
        const { error } = loginValidation(req.body,lang);
        if (error) return res.status(400).send({
            success: false,
            message: error.details[0].message
        });

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: getMessage("USER_NOT_FOUND", lang)
            });
        }

        // Dummy password check (Replace with real password hashing later)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: getMessage("INVALID_PASSWORD", lang)
            });
        }

        return res.status(200).json({
            success: true,
            message: getMessage("LOGIN_SUCCESS", lang),
            data: {
                user: {
                    username: user.username,
                    phone: user.phone,
                    address: user.address,
                    avatar: user.profileImg
                },
                accessToken: "No Token"
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: getMessage("LOGIN_ERROR", lang)
        });
    }
};

module.exports = { RegisterController, LoginController };
