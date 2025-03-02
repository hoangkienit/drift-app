const UserService = require("../services/user.service");
const AvatarService = require('../services/avatar.service');
const { updateInformationValidation, updatePasswordValidation } = require("../utils/validation");

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

        if (!id || !email || !phone) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

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

    // 🔹 Update User Password
    static updatePassword = async (req, res) => {
        const lang = req.headers["accept-language"];
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (!id || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // ✅ Validate input
        const { error } = updatePasswordValidation(req.body, lang);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        try {
             
            const response = await UserService.updatePassword({id, newPassword, oldPassword, lang});

            // If success
            return res.status(200).json({
                success: true,
                message: response.message,
                data: response
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            })
        }
    }

    static async uploadAvatar(req, res) {
        const { id } = req.params;

    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        // Fetch current user to get old avatar URL
        const user = await UserService.getUserById(id);
        
        const imageUrl = await AvatarService.processAndUploadAvatar(req.file, user.profileImg);

        if (!imageUrl) {
            return res.status(500).json({ success: false, error: "Image upload failed" });
        }
        
        const updatedUser = await UserService.updateAvatar({id, imageUrl})

      res.json({
        success: true,
        message: 'Image uploaded successfully!',
          data: {
            user: updatedUser
        },
      });
    } catch (error) {
        console.log("Error", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = UserController;
