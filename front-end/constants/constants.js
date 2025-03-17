import Constants from 'expo-constants';

const ipAddress = '192.168.1.223';

export const BASE_API_URL_V1 = `http://${ipAddress}:3000/api/v1`;
export const BASE_SOCKET_URL = `ws://${ipAddress}:3000`;
export const APP_VERSION = `v${Constants.expoConfig.version}`;