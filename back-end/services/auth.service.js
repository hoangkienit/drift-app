const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const getMessage = require("../utils/getMessage");

class AuthService {
  // 🔹 Register a new user
  static async register({ username, phone, password, lang }) {
    // 🛑 Check if user already exists
    const existUser = await User.findOne({ phone }).lean();
    if (existUser) {
      throw new Error(getMessage("USER_EXISTS", lang));
    }

    // 🔒 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create user
    await User.create({ username, phone, password: hashedPassword });

    return { message: getMessage("SIGNUP_SUCCESS", lang) };
  }

  // 🔹 Login user and generate JWT
  static async login({ username, password, lang }) {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      throw new Error(getMessage("USER_NOT_FOUND", lang));
    }

    // 🔑 Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(getMessage("INVALID_PASSWORD", lang));
    }

    // 📲 Generate Access Token
    const accessToken = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    });

    return {
      user: {
        username: user.username,
        phone: user.phone,
        address: user.address,
        profileImg: user.profileImg,
      },
      accessToken,
    };
  }
}

module.exports = AuthService;
