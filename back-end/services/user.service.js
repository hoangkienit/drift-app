const User = require("../models/user.model");

class UserService {
    // Fetch all users
    static async getUsers() {
        return await User.find().select("-password").lean();
    }

    // Fetch a single user by ID
    static async getUserById(id) {
        return await User.findById(id).select("-password").lean();
    }
}

module.exports = UserService;
