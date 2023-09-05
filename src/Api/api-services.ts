import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINT, API_ERR_MSG, STATUS_CODES } from './constants';
import { AsyncStorageUtils, logoutSessionExpired } from '../Utils/constants';
import { printLogs } from '../Utils/log-utils';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { SimpleAlert } from '../Utils/SimpleAlert';


export class APIServices {

  static BASE_URL: string = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';
  axiosInstance: Axios;
  static secondRequest: boolean = false;
  isTokenRequired: boolean = true;
  static navigation: DrawerNavigationProp<any, any>;

  constructor( isTokenRequired: boolean, navigation: DrawerNavigationProp<any, any> ) {
    this.isTokenRequired = isTokenRequired;
    APIServices.navigation = navigation;
    this.axiosInstance = axios.create( this.getConfig() );

    if ( isTokenRequired ) {
      this.interceptorAPI();
    }
  }

  interceptorAPI = () => {

    const instance = this.axiosInstance;

    this.axiosInstance.interceptors.request.use( handleRequest, error => {
      printLogs( 'Interceptor request error:', error );
      return Promise.reject( error );
    } );

    this.axiosInstance.interceptors.response.use( handleResponseSuccess, handleResponseError );

    async function handleRequest( config: any ) {
      const token = await AsyncStorageUtils.getUserToken();
      if ( token ) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      printLogs( 'Interceptor successful REQUEST config:', config );
      return config;
    }

    async function handleResponseSuccess( response: any ) {
      printLogs( 'Interception API successful RESPONSE config:', response );
      console.log( '\n\n\nconfig:', response );
      return response;
    }

    async function renewTokenAndRequest( config: any ) {
      const cloneConfig = { ...config };
      console.log( '\n\n\nCloned Configuration:', cloneConfig );
      try {
        const renewToken = await instance.post( API_ENDPOINT.RENEW_TOKEN );
        if ( renewToken.status === STATUS_CODES.SUCCESS ) {
          const loginResponse = await AsyncStorageUtils.getLoginResponse();
          if ( loginResponse ) {
            loginResponse.token = renewToken.data.token;
            await AsyncStorageUtils.setLoginResponse( loginResponse );
            printLogs( '2nd request renew token successful. New login response:', loginResponse );
          }
          const response = await instance.post( cloneConfig );
          if ( response.status === STATUS_CODES.SUCCESS ) {
            APIServices.secondRequest = false;
            printLogs( 'Successful interceptor RESPONSE on 2nd request:', response );
            return response;
          }
        }
      } catch ( error ) {
        logoutSessionExpired( APIServices.navigation );
        return Promise.reject( error );
      }
    }

    async function handleResponseError( error: any ) {
      const token = await AsyncStorageUtils.getUserToken();
      if (
        token &&
        ( error.response.status === STATUS_CODES.UNAUTHORIZED || error.response.status === STATUS_CODES.TOKEN_EXPIRED ) &&
        !APIServices.secondRequest
      ) {
        APIServices.secondRequest = true;
        return await renewTokenAndRequest( error.config );
      }
      printLogs( 'Intereptor 2nd Request also failed. Error:', error );
      return Promise.reject( error );
    }
  }

  isInternetConnected = async (): Promise<{ status: boolean; msg: string }> => {
    let netinfo: NetInfoState = await NetInfo.fetch();

    if ( !netinfo.isConnected ) {
      return { status: false, msg: API_ERR_MSG.INTERNET_ERR };
    } else {
      return { status: true, msg: '' };
    }
  }

  getConfig = (): AxiosRequestConfig => {
    return {
      baseURL: APIServices.BASE_URL,
      timeout: 10000,
      responseType: 'json',
    };
  }

  get = async ( path: string, headers?: any ) => {
    try {
      const isInternet = await this.isInternetConnected();

      if ( isInternet.status ) {
        return await this.axiosInstance.get( path, headers ? { headers: headers } : {} )
          .then( ( response: AxiosResponse ) => {
            return response;
          } )
          .catch( ( error: AxiosError ) => {
            throw error;
          } )
      } else {
        SimpleAlert( '', API_ERR_MSG.INTERNET_ERR );
      }
    } catch ( error ) {
      printLogs( 'Get Method Request Error:', error );
    }
  }

  post = async ( path: string, body?: any, headers?: any ) => {
    try {
      const isInternet = await this.isInternetConnected();

      if ( isInternet.status ) {
        return await this.axiosInstance.post( path, body, headers ? { headers: headers } : {} )
          .then( ( response: AxiosResponse ) => {
            return response;
          } )
          .catch( ( error: AxiosError ) => {
            throw error;
          } )
      } else {
        SimpleAlert( '', API_ERR_MSG.INTERNET_ERR );
      }
    } catch ( error ) {
      printLogs( 'Post Method Request Error:', error );
      throw error;
    }
  }

}

const axiosInstance = axios.create(
  {
    baseURL: APIServices.BASE_URL,
    timeout: 10000,
    responseType: 'json',
  } )

export default axiosInstance;