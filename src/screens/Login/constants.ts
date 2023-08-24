import {stringMd5} from 'react-native-quick-md5';

export enum LOGIN_ERROR_ALERTS {
  EMPTY_FIELDS = 'Please fill all the required fields!',
  INVALID_EMAIL = 'Please enter a valid email address!',
  LOGIN_API_ERR = 'Invalid Username or Password!',
  FORGOT_PW_ERR = 'Invalid Email ID!',
}

export enum FORGOT_PW_SUCCESS_ALERT {
  RESET_SUCCESS = 'Password successfully sent to email provided',
}

export const encryptPassword = (password: string) => {
  return stringMd5(password);
};
