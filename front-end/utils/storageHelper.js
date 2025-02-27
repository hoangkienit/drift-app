import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data', error);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving user data', error);
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log("Clearing user data...");
  } catch (error) {
    console.error('Error clearing user data', error);
  }
};
