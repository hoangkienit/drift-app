import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as mime from 'mime';

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
        "Authorization": `Bearer ${accessToken}`
      }
    });
    console.log(response);
    return response.data;
};

const allowedExtensions = ["jpg", "jpeg", "png"];

const getFileType = (uri) => {
  const fileExtension = uri.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("Invalid file type. Only JPG and PNG are allowed.");
  }

  return fileExtension === "png" ? "image/png" : "image/jpeg";
};

export const updateAvatar = async (userId, accessToken, avatarUri) => {
  try {
    const formData = new FormData();
    formData.append("avatar", {
      uri: avatarUri,
      name: `avatar_${userId}.${avatarUri.split('.').pop()}`,
      type: getFileType(avatarUri),
    });

    const response = await axios.put(
      `${BASE_API_URL}/user/update-avatar/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "accept-language": await AsyncStorage.getItem("userLanguage"),
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Avatar updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error;
  }
};
