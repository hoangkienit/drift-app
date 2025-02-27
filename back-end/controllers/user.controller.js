const UserService = require("../services/user.service");
const { updateInformationValidation } = require("../utils/validation");

class UserController {
    // 🔹 Get All Users
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

    // 🔹 Get User By ID
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

    // 🔹 Update User Information
    static updateUser = async (req, res) => {
        const lang = req.headers["accept-language"];
        const { id } = req.params;
        const { email, phone } = req.body;

        // ✅ Validate input
        const { error } = updateInformationValidation(req.body, lang);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        try {
             
            const response = await UserService.updateUser({id, email, phone, lang});

            // If success
            return res.status(200).json({
                success: true,
                message: response.message,
                data: response
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error in Update User API',
                error
            })
        }
    }
}

module.exports = UserController;
