import { AsyncStorageUtils } from "../Utils/constants";
import { SCREEN_NAMES } from "../Navigators/constants";
import { DrawerNavigationProp } from "@react-navigation/drawer/lib/typescript/src/types";

export const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export enum API_ENDPOINT {
  LOGIN = '/auth/login',
  FORGOT_PW = '/auth/forgotpwd',
  LOGOUT = '/auth/logout',
  RENEW_TOKEN = '/auth/renew',
  GET_TRUCKS = '/trucks',
  GET_JOBS_FOR_TRUCK = '/jobs/list',
  GET_JOB_INFO_BY_JOB_ID = '/jobs',
  LOCK_JOB = '/jobs/{{JOB_ID}}/lock',
  UNLOCK_JOB = '/jobs/{{JOB_ID}}/unlock',
  INIT_FILE_UPLOAD = '/files/init',
  UPDATE_FILE_UPLOAD_STATUS = '/files/complete',
  SUBMIT_JOB = '/jobs/{{JOB_ID}}',
}

export enum API_ERR_MSG {
  INTERNET_ERR = 'Network Error: Please check your internet connection and try again!',
  ERR = 'Error processing request.',
  REQ_CANCEL_ERR = 'Request interrupted, Please try again!',
  LOGOUT_ERR = 'Session Expired!',
}

export enum JOBS_API_ERR {
  JOB_NOT_FOUND = 'Jobs does not exist. Refresh and try again!',
}

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  TOKEN_EXPIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  NO_INTERNET: -1,
};

export const logoutAndNavigateToLoginScreen = ( navigation: DrawerNavigationProp<any, any> ) => {
  AsyncStorageUtils.clearAllUserData();
  navigation.reset( {
    index: 0,
    routes: [{ name: SCREEN_NAMES.LOGIN, }],
  } );
};