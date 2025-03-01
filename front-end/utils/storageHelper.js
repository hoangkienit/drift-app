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
  } catch (error) {
    console.error('Error clearing user data', error);
  }
  
};

export const storeAccessToken = async (accessToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error('Error saving access token', error);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    return accessToken != null ? accessToken : null;
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
};

export const clearAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error clearing access token', error);
  }
};
