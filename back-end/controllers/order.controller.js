const OrderService = require("../services/order.service");
const getLanguage = require("../utils/getLanguage");

class OrderController {
    // 🔹 Get Recent Orders
    static async getRecentOrders(req, res) {
        try {
            const { merchantId } = req.params;
            const lang = getLanguage(req.headers["accept-language"]);
            // TODO: VALIDATE THE INPUT
            const result = await OrderService.getRecentOrders({ merchantId, lang });

            return res.status(200).json({
                success: true,
                message: "Successfully get orders data",
                data: {
                    recent_order: result
                }
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = OrderController;