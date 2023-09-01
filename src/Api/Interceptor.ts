import axios from 'axios';
import { API_ENDPOINT, STATUS_CODES } from './constants';
import { AsyncStorageUtils, logoutSessionExpired } from '../Utils/constants';
import { printLogs } from '../Utils/log-utils';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const BASE_URL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

const axiosInstance = axios.create( {
  baseURL: BASE_URL,
  timeout: 10000,
} );

let secondRequest = false;

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
  return response;
}

async function renewTokenAndRequest( config: any ) {
  const cloneConfig = { ...config };
  try {
    const renewToken = await axiosInstance( API_ENDPOINT.RENEW_TOKEN );
    if ( renewToken.status === STATUS_CODES.SUCCESS ) {
      const loginResponse = await AsyncStorageUtils.getLoginResponse();
      if ( loginResponse ) {
        loginResponse.token = renewToken.data.token;
        await AsyncStorageUtils.setLoginResponse( loginResponse );
      }
      const response = await axiosInstance( cloneConfig );
      if ( response.status === 200 ) {
        secondRequest = false;
        printLogs( 'Successful interceptor RESPONSE on 2nd request:', response );
        return response;
      }
    }
  } catch ( error ) {
    return Promise.reject( error );
  }
}

async function handleResponseError( error: any ) {
  const token = await AsyncStorageUtils.getUserToken();
  if (
    token &&
    ( error.response.status === STATUS_CODES.UNAUTHORIZED || error.response.status === STATUS_CODES.TOKEN_EXPIRED ) &&
    !secondRequest
  ) {
    secondRequest = true;
    try {
      return await renewTokenAndRequest( error.config );
    } catch ( error ) {
      return Promise.reject( error );
    }
  }
  printLogs( 'Intereptor 2nd Request failed, redirecting back to Login Page. Error:', error );
  return Promise.reject( error );
}

axiosInstance.interceptors.request.use( handleRequest, error => {
  printLogs( 'Interceptor request error:', error );
  return Promise.reject( error );
} );

axiosInstance.interceptors.response.use( handleResponseSuccess, handleResponseError );

export default axiosInstance;
