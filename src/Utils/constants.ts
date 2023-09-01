import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginDataProps } from "../screens/types";
import { AlertWithOneActionableOption } from "./SimpleAlert";
import { API_ERR_MSG, logoutAndNavigateToLoginScreen } from "../Api/constants";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export enum ASYNC_STORAGE_KEY {
  LOGINRESPONSE = '@loginResponse',
}

export class AsyncStorageUtils {

  static clearAllUserData = async () => {
    await AsyncStorage.removeItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
  }

  static setLoginResponse = async ( value: ILoginDataProps ) => {
    const userData = JSON.stringify( value );
    try {
      await AsyncStorage.setItem( ASYNC_STORAGE_KEY.LOGINRESPONSE, userData );
    } catch ( error ) {
      console.log( '\n\n\nError settings Login Response:', error );
    }
  }

  static getLoginResponse = async () => {
    try {
      const response = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      return response != null ? JSON.parse( response ) : '';
    } catch ( error ) {
      return '';
    }
  }

  static getUserToken = async () => {
    try {
      const response = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      const authToken: ILoginDataProps = response != null ? JSON.parse( response ) : null;
      return authToken ? authToken.token : '';
    } catch ( error ) {
      console.log( '\n\n\nError fetching Auth token:', error );
      return '';
    }
  }

  static getAppVersion = async () => {
    try {
      const loginResponse = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      const appVersion: ILoginDataProps = loginResponse != null ? JSON.parse( loginResponse ) : null;
      return appVersion ? appVersion["latest-app-ver"] : '';
    } catch ( error ) {
      console.log( '\n\n\nError fetching app version:', error );
      return '';
    }
  }

  static getUsername = async () => {
    try {
      const response = await AsyncStorage.getItem( ASYNC_STORAGE_KEY.LOGINRESPONSE );
      const username: ILoginDataProps = response != null ? JSON.parse( response ) : null;
      return username ? username.uname : '';
    } catch ( error ) {
      return '';
    }
  }
}

export const logoutSessionExpired = async ( navigation: DrawerNavigationProp<any, any> ) => {
  AlertWithOneActionableOption(
    '',
    API_ERR_MSG.LOGOUT_ERR,
    'Ok',
    false,
    () => logoutAndNavigateToLoginScreen( navigation ),
  );
}
