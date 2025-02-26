const AuthService = require("../services/auth.service");
const { loginValidation, registerValidation } = require("../utils/validation");

class AuthController {
  // 🔹 Register User
  static async register(req, res) {
    const lang = req.headers["accept-language"];
    const { username, phone, password } = req.body;

    // ✅ Validate input
    const { error } = registerValidation(req.body, lang);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try {
      const response = await AuthService.register({ username, phone, password, lang });
      return res.status(201).json({ success: true, message: response.message });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 🔹 Login User
  static async login(req, res) {
    const lang = req.headers["accept-language"];
    const { username, password } = req.body;

    // ✅ Validate input
    const { error } = loginValidation(req.body, lang);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try {
      const response = await AuthService.login({ username, password, lang });
      return res.status(200).json({ success: true, message: "Login successful", data: response });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = AuthController;
