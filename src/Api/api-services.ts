import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {API_ENDPOINT, API_ERR_MSG, STATUS_CODES} from './constants';
import {AsyncStorageUtils, logoutSessionExpired} from '../Utils/constants';
import {printLogs} from '../Utils/log-utils';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {SimpleAlert} from '../Utils/SimpleAlert';
import {ThunkDispatch} from '@reduxjs/toolkit';

export class APIServices {
  static BASE_URL: string =
    'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';
  axiosInstance: Axios;
  static secondRequest: boolean = false;
  isTokenRequired: boolean = true;
  static navigation: DrawerNavigationProp<any, any>;
  static dispatch: ThunkDispatch<any, any, any>;

  constructor(
    isTokenRequired: boolean,
    navigation: DrawerNavigationProp<any, any>,
    dispatch: ThunkDispatch<any, any, any>,
  ) {
    this.isTokenRequired = isTokenRequired;
    APIServices.navigation = navigation;
    APIServices.dispatch = dispatch;
    this.axiosInstance = axios.create(this.getConfig());

    if (isTokenRequired) {
      this.interceptorAPI();
    }
  }

  interceptorAPI = () => {
    // const instance = this.axiosInstance;

    this.axiosInstance.interceptors.request.use(handleRequest, error => {
      printLogs('Interceptor request error:', error);
      return Promise.reject(error);
    });

    this.axiosInstance.interceptors.response.use(
      handleResponseSuccess,
      handleResponseError,
    );

    async function handleRequest(config: any) {
      const token = await AsyncStorageUtils.getUserToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      printLogs('Interceptor successful REQUEST config:', config);
      return config;
    }

    async function handleResponseSuccess(response: any) {
      const TAG = handleResponseSuccess.name;
      printLogs('Interception API successful RESPONSE config:', response?.data);
      printLogs(TAG, '| RESPONSE data:', response.data);
      return response;
    }

    async function renewTokenAndRequest(config: any) {
      const TAG = renewTokenAndRequest.name;
      const cloneConfig = {...config};
      printLogs(TAG, '| Cloned Config:', cloneConfig);
      const url = cloneConfig?.url;
      try {
        const renewToken = await new APIServices(
          true,
          APIServices.navigation,
          APIServices.dispatch,
        ).post(API_ENDPOINT.RENEW_TOKEN);
        if (renewToken?.status === STATUS_CODES.SUCCESS) {
          const loginResponse = await AsyncStorageUtils.getLoginResponse();
          if (loginResponse) {
            loginResponse.token = renewToken.data.token;
            await AsyncStorageUtils.setLoginResponse(loginResponse);
            printLogs(
              'Token renewed successfully. New login response:',
              loginResponse?.data,
            );
          }
          const response = await new APIServices(
            true,
            APIServices.navigation,
            APIServices.dispatch,
          ).post(url, cloneConfig?.data);
          if (response?.status === STATUS_CODES.SUCCESS) {
            APIServices.secondRequest = false;
            printLogs(
              'Successful interceptor RESPONSE on 2nd request:',
              response?.data,
            );
            return response;
          }
        }
      } catch (error) {
        logoutSessionExpired(APIServices.navigation, APIServices.dispatch);
        return Promise.reject(error);
      }
    }

    async function handleResponseError(error: any) {
      const TAG = handleResponseError.name;
      const token = await AsyncStorageUtils.getUserToken();
      printLogs(TAG, '| Interceptor RESPONSE error:', error);
      if (
        token &&
        (error.response.status === STATUS_CODES.UNAUTHORIZED ||
          error.response.status === STATUS_CODES.TOKEN_EXPIRED) &&
        !APIServices.secondRequest
      ) {
        APIServices.secondRequest = true;
        return await renewTokenAndRequest(error.config);
      }
      return Promise.reject(error);
    }
  };

  isInternetConnected = async (): Promise<{status: boolean; msg: string}> => {
    let netinfo: NetInfoState = await NetInfo.fetch();

    if (!netinfo.isConnected) {
      return {status: false, msg: API_ERR_MSG.INTERNET_ERR};
    } else {
      return {status: true, msg: ''};
    }
  };

  getConfig = (): AxiosRequestConfig => {
    return {
      baseURL: APIServices.BASE_URL,
      timeout: 10000,
      responseType: 'json',
    };
  };

  get = async (path: string, headers?: any) => {
    try {
      const isInternet = await this.isInternetConnected();

      if (isInternet.status) {
        return await this.axiosInstance
          .get(path, headers ? {headers: headers} : {})
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      } else {
        SimpleAlert('', API_ERR_MSG.INTERNET_ERR);
      }
    } catch (error) {
      printLogs('API Get Method REQUEST Error:', error);
      throw error;
    }
  };

  post = async (path: string, body?: any, headers?: any) => {
    try {
      const isInternet = await this.isInternetConnected();

      if (isInternet.status) {
        return await this.axiosInstance
          .post(path, body, headers ? {headers: headers} : {})
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      } else {
        SimpleAlert('', API_ERR_MSG.INTERNET_ERR);
      }
    } catch (error) {
      printLogs('API Post Method Request Error:', error);
      throw error;
    }
  };
}
