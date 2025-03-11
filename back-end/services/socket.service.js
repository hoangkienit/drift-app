const Merchant = require("../models/merchant.model");

const socketService = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("UPDATE_RESTAURANT_STATUS", async ({ merchantId, status }) => {
      try {
        await Merchant.findByIdAndUpdate(merchantId, { status });

        // Broadcast updated status to all clients
        io.emit("RESTAURANT_STATUS_UPDATED", { merchantId, status });
      } catch (error) {
        console.error("❌ Error updating restaurant status:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketService;
