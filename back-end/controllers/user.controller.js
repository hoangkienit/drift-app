const UserService = require("../services/user.service");

class UserController {
    // Get all users
    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch users"
            });
        }
    }

    // Get user by ID
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch user"
            });
        }
    }
}

module.exports = UserController;
