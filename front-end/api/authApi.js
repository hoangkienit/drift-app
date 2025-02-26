import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.115:3000/api/v1/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password }, {
      headers: { "accept-language": await AsyncStorage.getItem('userLanguage') }
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

export const register = async (username, phone, password) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, { username, phone, password }, {
      headers: { "accept-language": await AsyncStorage.getItem('userLanguage') }
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
