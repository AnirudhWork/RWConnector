import { stringMd5 } from 'react-native-quick-md5';
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info';

export enum LOGIN_ERROR_ALERTS {
  EMPTY_FIELDS = 'Please fill all the required fields!',
  INVALID_EMAIL = 'Please enter a valid email address!',
  LOGIN_API_ERR = 'Invalid Username or Password!',
  FORGOT_PW_ERR = 'Invalid Email ID!',
}

export enum FORGOT_PW_SUCCESS_ALERT {
  RESET_SUCCESS = 'Password successfully sent to email provided',
}

export const decryptPassword = ( password: string ) => {
  return stringMd5( password );
};

export type TLoginRequestBody = {
  uname: string;
  pwd: string;
  'app-version': string;
  'os-version': string;
  'device-type': string;
};

export const getLoginRequestBody = ( uname: string, pwd: string ): TLoginRequestBody => {
  return {
    uname: uname,
    pwd: pwd,
    'device-type': DeviceInfo.getDeviceType(),
    'app-version': DeviceInfo.getVersion(),
    'os-version': `${Platform.OS}-${Platform.Version}`,
  };
};