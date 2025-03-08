const User = require("../models/user.model");
const getMessage = require("../utils/getMessage");
const bcrypt = require("bcryptjs");

class UserService {
    // FETCH ALL USERS
    static async getUsers() {
        return await User.find().select("-password").lean();
    }

    // FETCH USER BY ID
    static async getUserById(id) {
        const user = await User.findById({ _id: id }).select("-password");
        if (!user) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }
        return user;
    }
    
    // UPDATE USER INFORMATION
    static async updateUser({ id, email, phone, lang }) {
        const user = await User.findById({ _id: id }).select("-password");
        if (!user) {
            throw new Error(getMessage("USER_NOT_FOUND", lang));
        }

        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();

        return {user: user, message: getMessage("UPDATE_INFORMATION_SUCCESS")}
    }

    // UPDATE USER PASSWORD
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

        return {message: getMessage("UPDATE_PASSWORD_SUCCESS", lang)}
    }

    // UPDATE USER AVATAR
    static async updateAvatar({ id, imageUrl }) {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { profileImg: imageUrl } },  // ✅ Ensure avatar field is updated
            { new: true }
        );

    if (!updatedUser) {
        console.error("Failed to update user avatar. User not found.");
        return null;
    }

        return updatedUser;
    }

}

module.exports = UserService;
