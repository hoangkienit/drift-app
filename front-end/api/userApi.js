import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateUserInfo = async (userId, accessToken, phone, email) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/user/update-user/${userId}`, {
      phone,
      email,
    }, {
      headers: {
        "accept-language": await AsyncStorage.getItem('userLanguage'),
        "Authorization": `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error.response?.data || error);
    throw new Error("Network error! Please check your connection.");
  }
};

export const updatePassword = async (userId, accessToken, oldPassword, newPassword) => {
  const response = await axios.put(`${BASE_API_URL}/user/update-password/${userId}`, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        "accept-language": await AsyncStorage.getItem('userLanguage'),
        //"Authorization": `Bearer ${accessToken}`
      }
    });
    console.log(response);
    return response.data;
};
