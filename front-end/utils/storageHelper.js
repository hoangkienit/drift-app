import * as SecureStore from "expo-secure-store";

// USER DATA
export const storeUserData = async (userData) => {
  try {
    await SecureStore.setItemAsync("user", JSON.stringify(userData), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error("Error saving user data", error);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync("user");
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving user data", error);
  }
};

export const clearUserData = async () => {
  try {
    await SecureStore.deleteItemAsync("user");
  } catch (error) {
    console.error("Error clearing user data", error);
  }
};


// ACCESS TOKEN
export const storeAccessToken = async (accessToken) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error("Error saving access token", error);
  }
};

export const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync("accessToken");
  } catch (error) {
    console.error("Error retrieving access token", error);
  }
};

export const clearAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
  } catch (error) {
    console.error("Error clearing access token", error);
  }
};

// RESTAURANT DATA
export const storeRestaurantData = async (restaurantData) => {
  try {
    await SecureStore.setItemAsync("restaurant", JSON.stringify(restaurantData), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error("Error saving restaurant data", error);
  }
};

export const getRestaurantData = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync("restaurant");
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving restaurant data", error);
  }
};

export const clearRestaurantData = async () => {
  try {
    await SecureStore.deleteItemAsync("restaurant");
  } catch (error) {
    console.error("Error clearing restaurant data", error);
  }
};

// FOOD DATA
export const storeFoodData = async (foodData) => {
  try {
    await SecureStore.setItemAsync("food", JSON.stringify(foodData), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error("Error saving food data", error);
  }
};

export const getFoodData = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync("food");
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving food data", error);
  }
};

export const clearFoodData = async () => {
  try {
    await SecureStore.deleteItemAsync("food");
  } catch (error) {
    console.error("Error clearing food data", error);
  }
};
