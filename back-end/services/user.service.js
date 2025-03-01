const User = require("../models/user.model");
const getMessage = require("../utils/getMessage");
const bcrypt = require("bcryptjs");

class UserService {
    // Fetch all users
    static async getUsers() {
        return await User.find().select("-password").lean();
    }

    // Fetch a single user by ID
    static async getUserById(id) {
        return await User.findById(id).select("-password").lean();
    }

    static async updateUser({ id, email, phone, lang }) {
        console.log(id);
        const user = await User.findById({ _id: id }).select("-password");
        if (!user) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }

        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();

        return {user: user, message: getMessage("UPDATE_INFORMATION_SUCCESS")}
    }

    static async updatePassword({ id, newPassword, oldPassword, lang }) {
        const user = await User.findById({ _id: id });
        if (!user) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error(getMessage("INVALID_OLD_PASSWORD", lang));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return {message: getMessage("UPDATE_PASSWORD_SUCCESS")}
    }
}

module.exports = UserService;
