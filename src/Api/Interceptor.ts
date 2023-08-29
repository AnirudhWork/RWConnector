import axios from 'axios';
import { API_ENDPOINT, STATUS_CODES } from './constants';
import { AsyncStorageUtils } from '../Utils/constants';

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
  console.log( '\n\n\nInterceptor API, Access Token:', token );
  console.log( '\n\n\nInterceptor API config:', config );
  return config;
}

async function handleResponseSuccess( response: any ) {
  console.log( '\n\n\nInterception API successful response:', response.config );
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
        console.log( '\n\n\nSuccessful interceptor response on 2nd request', response );
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
  console.log( '\n\nFully rejected', error );
  return Promise.reject( error );
}

axiosInstance.interceptors.request.use( handleRequest, error => {
  console.log( '\n\n\nInterceptor API error while fetching token', error );
  return Promise.reject( error );
} );

axiosInstance.interceptors.response.use( handleResponseSuccess, handleResponseError );

export default axiosInstance;
