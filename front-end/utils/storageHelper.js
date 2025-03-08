import * as SecureStore from "expo-secure-store";

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
