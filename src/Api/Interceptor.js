import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

let secondRequest = false;

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

axiosInstance.interceptors.response.use(
  async response => {
    console.log(
      '\n\n\n\n\n\nSuccessful Response configuration:',
      response.config,
    );
    return response;
  },
  async error => {
    if (
      (error.response.status === 401 || error.response.status === 402) &&
      !secondRequest
    ) {
      secondRequest = true;
      const cloneConfig = {...error.config};
      try {
        console.log('Cloned configuration:', cloneConfig);
        const renewToken = await axiosInstance('/auth/renew');
        if (renewToken.status === 200) {
          await AsyncStorage.setItem('userToken', renewToken.data.token);
          try {
            const response = await axiosInstance(cloneConfig);
            if (response.status === 200) {
              secondRequest = false;
              console.log(
                '\n\n\n\n\n\n\nSuccessful Response of 2nd request',
                response,
              );
              return response;
            }
          } catch (error) {
            secondRequest = false;
            console.log(
              '\n\n\n\n\ntry & catch error on 2nd request:',
              error,
              '\n\n\n\nerror status code:',
              error.response.status,
            );
            return Promise.reject(error);
          }
        }
      } catch (error) {
        secondRequest = false;
        console.log(
          '\n\n\n Error renewing token:',
          error,
          '\n\n\nStatus code of renew token error:',
          error.response.status,
        );
        return Promise.reject(error);
      }
    }
    console.log('Pura rejected:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
