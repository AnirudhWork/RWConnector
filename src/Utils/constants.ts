import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginDataProps } from "../screens/types";
import { SimpleAlert } from "./SimpleAlert";
import { API_ERR_MSG, logoutAndNavigateToLoginScreen } from "../Api/constants";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { printLogs } from "./log-utils";

export enum ASYNC_STORAGE_KEY {
  LOGINRESPONSE = '@loginResponse',
}

export class AsyncStorageUtils {

  static clearAllUserData = async () => {
    const TAG = this.clearAllUserData.name;
    await AsyncStorage.removeItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
    printLogs( TAG, '| successfully' );
  }

  static setLoginResponse = async ( value: ILoginDataProps ) => {
    const TAG = this.setLoginResponse.name;
    const userData = JSON.stringify( value );
    try {
      await AsyncStorage.setItem( ASYNC_STORAGE_KEY.LOGINRESPONSE, userData );
    } catch ( error ) {
      printLogs( TAG, '| Error setting response. Error:', error );
    }
  }

  static getLoginResponse = async () => {
    const TAG = this.getLoginResponse.name;
    try {
      const response = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      return response != null ? JSON.parse( response ) : '';
    } catch ( error ) {
      printLogs( TAG, '| error getting Login Response:', error );
      return '';
    }
  }

  static getUserToken = async () => {
    const TAG = this.getUserToken.name;
    try {
      const response = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      const authToken: ILoginDataProps = response != null ? JSON.parse( response ) : null;
      return authToken ? authToken.token : '';
    } catch ( error ) {
      printLogs( TAG, '| error getting user token:', error );
      return '';
    }
  }

  static getAppVersion = async () => {
    const TAG = this.getAppVersion.name;
    try {
      const loginResponse = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      const appVersion: ILoginDataProps = loginResponse != null ? JSON.parse( loginResponse ) : null;
      return appVersion ? appVersion["latest-app-ver"] : '';
    } catch ( error ) {
      printLogs( TAG, '| error fetching app version:', error );
      return '';
    }
  }

  static getUsername = async () => {
    const TAG = this.getUserToken.name;
    try {
      const response = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      const username: ILoginDataProps = response != null ? JSON.parse( response ) : null;
      return username ? username.uname : '';
    } catch ( error ) {
      printLogs( TAG, '| error fetching username:', error );
      return '';
    }
  }
}

export const logoutSessionExpired = async ( navigation: DrawerNavigationProp<any, any> ) => {
  const TAG = logoutAndNavigateToLoginScreen.name;
  printLogs( TAG );
  logoutAndNavigateToLoginScreen( navigation );
  SimpleAlert(
    '',
    API_ERR_MSG.LOGOUT_ERR,
  );
}
