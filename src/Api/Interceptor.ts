import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_ENDPOINT} from './constants';
import {ASYNC_STORAGE_KEY} from '../Utils/constants';

const BASE_URL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

let secondRequest = false;

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.AUTH_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('\n\n\n\nAccess Token:', token);
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
    const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.AUTH_TOKEN);
    if (
      token &&
      (error.response.status === 401 || error.response.status === 402) &&
      !secondRequest
    ) {
      secondRequest = true;
      const cloneConfig = {...error.config};
      try {
        console.log('Cloned configuration:', cloneConfig);
        const renewToken = await axiosInstance(API_ENDPOINT.RENEW_TOKEN);
        if (renewToken.status === 200) {
          await AsyncStorage.setItem(
            ASYNC_STORAGE_KEY.AUTH_TOKEN,
            renewToken.data.token,
          );
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
            const knowError = error as any;
            console.log(
              '\n\n\n\n\ntry & catch error on 2nd request:',
              knowError,
              '\n\n\n\nerror status code:',
              knowError.response.status,
            );
            return Promise.reject(knowError);
          }
        }
      } catch (error) {
        const knowError = error as any;
        secondRequest = false;
        console.log(
          '\n\n\n Error renewing token:',
          knowError,
          '\n\n\nStatus code of renew token error:',
          knowError.response.status,
        );
        return Promise.reject(knowError);
      }
    }
    console.log('Fully rejected', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
