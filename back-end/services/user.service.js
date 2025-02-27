const User = require("../models/user.model");
const getMessage = require("../utils/getMessage");

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
}

module.exports = UserService;
