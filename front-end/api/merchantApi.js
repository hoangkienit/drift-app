import axios from "axios";
import { BASE_API_URL_V1 } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const createNewRestaurant = async (
                id,
                accessToken,
                restaurantName,
                restaurantDescription,
                selectedCategory,
                houseNumber,
                streetName,
                selectedCity,
                selectedDistrict,
                selectedWard) => {
  try {
    const response = await axios.post(`${BASE_API_URL_V1}/merchant/create-restaurant/${id}`, {
                restaurantName,
                restaurantDescription,
                selectedCategory,
                houseNumber,
                streetName,
                selectedCity,
                selectedDistrict,
                selectedWard
    }, {
      headers: {
        "accept-language": await AsyncStorage.getItem('userLanguage'),
        "Authorization": `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    //console.error("Error in merchant API: ", error);
    //console.error("Error creating new merchant:", error.response?.data);
    throw error.response?.data;
  }
};

export const getRestaurant = async (id, accessToken) => {
  try {
    const response = await axios.get(`${BASE_API_URL_V1}/merchant/restaurant/${id}`, {
      headers: {
        "accept-language": await AsyncStorage.getItem('userLanguage'),
        "Authorization": `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error in merchant API: ", error);
    //console.error("Error creating new merchant:", error.response?.data);
    throw error.response?.data;
  }
};

export const getAllRestaurants = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_API_URL_V1}/merchant/restaurants`, {
      headers: {
        "accept-language": await AsyncStorage.getItem('userLanguage'),
        "Authorization": `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error in merchant API: ", error);
    //console.error("Error creating new merchant:", error.response?.data);
    throw error.response?.data;
  }
};

export const getRecentOrders = async (id, accessToken) => {
  try {
    const response = await axios.get(`${BASE_API_URL_V1}/order/recent-orders/${id}`, {
      headers: {
        "accept-language": await AsyncStorage.getItem('userLanguage'),
        "Authorization": `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error in order API: ", error);
    //console.error("Error creating new merchant:", error.response?.data);
    throw error.response?.data;
  }
};


