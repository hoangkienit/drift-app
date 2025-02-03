const { loginValidation, registerValidation } = require("../utils/validation");
const User = require('../models/user.model');

const RegisterController = async (req, res) => { 
    try {
        const { username, phone, password } = req.body;
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
        
        // Check exist user
        const existUser = await User.findOne({ phone });
        if (existUser) {
            return res.status(500).send({
                success: false,
                message: "Phone has been used by another account"
            })
        }

        // Create new user
        const newUser = {
            username,
            phone,
            password
        }
        const success = await User.create(newUser);
        return res.status(201).send({
            success: true,
            message: 'Sign up successfully'
        })

    } catch (error) {
        console.log("Register: ", error);
        res.status(500).send({
            success: false,
            message: "Error in registration process",
            error: error
        })
    }
}

module.exports = { RegisterController }