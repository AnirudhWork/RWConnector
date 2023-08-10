import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('userToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    console.log('\n\n\n\nAccess Token:', accessToken);
    console.log('\n\n\n\nInterceptor config:', config);
    return config;
  },
  error => {
    console.log('\n\n\n\nInterceptor error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
