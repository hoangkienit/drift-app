import { io } from "socket.io-client";
import { BASE_SOCKET_URL } from "../constants/constants";

class WebSocketService {
  constructor() {
    this.socket = io(BASE_SOCKET_URL, {
      transports: ["websocket"], // Force WebSocket connection
      reconnection: true,        // Auto-reconnect
      reconnectionAttempts: 10,  // Retry 10 times before giving up
      reconnectionDelay: 3000,   // 3 sec delay between retries
    });

    this.socket.on("connect", () => console.log("✅[Socket] connected " + this.socket.id));
    this.socket.on("disconnect", () => console.log("❌[Socket] disconnected"+ this.socket.id));
    this.socket.on("connect_error", (error) => console.log("🚨 WebSocket error:", error));
  }

  listen(event, callback) {
    this.socket.on(event, callback);
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
    
  remove(event, callback) {
    this.socket.off(event, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
