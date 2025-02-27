import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateUserInfo = async (userId, phone, email) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/user/update-user/${userId}`, {
      phone,
      email,
    }, { headers: { "accept-language": await AsyncStorage.getItem('userLanguage') } });

    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error.response?.data || error);
    throw new Error("Network error! Please check your connection.");
  }
};
