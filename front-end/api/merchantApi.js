import axios from "axios";
import { BASE_API_URL } from "../constants/constants";
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
    const response = await axios.post(`${BASE_API_URL}/merchant/create-restaurant/${id}`, {
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


