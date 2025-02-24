import axios from "axios";

const API_URL = "http://192.168.1.106:3000/api/v1/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password }, {
      headers: { "accept-language": "vi" }
    });

    return response.data; // Success case
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed!"); // Use backend message
    } else if (error.request) {
      throw new Error("Network error! Please check your connection.");
    } else {
      throw new Error("Unexpected error! Please try again.");
    }
  }
};
