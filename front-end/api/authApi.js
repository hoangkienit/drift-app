import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_API_URL_V1 } from "../constants/constants";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_API_URL_V1}/auth/login`, { username, password }, {
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

export const register = async (username, email, phone, password, role) => {
  try {
    const response = await axios.post(`${BASE_API_URL_V1}/auth/registration`, { username, email, phone, password, role }, {
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
