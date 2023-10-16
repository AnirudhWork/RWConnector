import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILoginDataProps} from '../screens/types';
import {AlertWithTwoActionableOptions, SimpleAlert} from './SimpleAlert';
import {API_ERR_MSG, logoutAndNavigateToLoginScreen} from '../Api/constants';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {printLogs} from './log-utils';
import DeviceInfo from 'react-native-device-info';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  setCompleteJobInfo,
  setSelectedJobInfo,
  setSelectedTruckInfo,
} from '../Redux/reducers/truck-selection-slice';

export enum ASYNC_STORAGE_KEY {
  LOGINRESPONSE = '@loginResponse',
}

export enum APP_VERSION_MSG {
  TITLE = 'Update the app',
  BODY = `Newer version is available`,
  UPDATE = 'UPDATE',
  CANCEL = 'CANCEL',
}

export class AsyncStorageUtils {
  static clearAllUserData = async () => {
    const TAG = 'clearAllUserData';
    await AsyncStorage.removeItem(ASYNC_STORAGE_KEY.LOGINRESPONSE);
    printLogs(TAG, '| successfully');
  };

  static setLoginResponse = async (value: ILoginDataProps) => {
    const TAG = this.setLoginResponse.name;
    const userData = JSON.stringify(value);
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY.LOGINRESPONSE, userData);
      return true;
    } catch (error) {
      printLogs(TAG, '| Error:', error);
      return false;
    }
  };

  static getLoginResponse = async () => {
    const TAG = this.getLoginResponse.name;
    try {
      const response = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY.LOGINRESPONSE,
      );
      return response != null ? JSON.parse(response) : '';
    } catch (error) {
      printLogs(TAG, '| error getting Login Response:', error);
      return '';
    }
  };

  static getUserToken = async () => {
    const TAG = this.getUserToken.name;
    try {
      const response = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY.LOGINRESPONSE,
      );
      const authToken: ILoginDataProps =
        response != null ? JSON.parse(response) : null;
      return authToken ? authToken.token : '';
    } catch (error) {
      printLogs(TAG, '| error getting user token:', error);
      return '';
    }
  };

  static getAppVersion = async () => {
    const TAG = this.getAppVersion.name;
    try {
      const loginResponse = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY.LOGINRESPONSE,
      );
      const appVersion: ILoginDataProps =
        loginResponse != null ? JSON.parse(loginResponse) : null;
      return appVersion ? appVersion['latest-app-ver'] : '';
    } catch (error) {
      printLogs(TAG, '| error fetching app version:', error);
      return '';
    }
  };

  static getUsername = async () => {
    const TAG = this.getUserToken.name;
    try {
      const response = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY.LOGINRESPONSE,
      );
      const username: ILoginDataProps =
        response != null ? JSON.parse(response) : null;
      return username ? username.uname : '';
    } catch (error) {
      printLogs(TAG, '| error fetching username:', error);
      return '';
    }
  };
}

export const logoutSessionExpired = async (
  navigation: DrawerNavigationProp<any, any>,
  dispatch: ThunkDispatch<any, any, any>,
) => {
  const TAG = logoutSessionExpired.name;
  printLogs(TAG, '| Executed');
  logoutAndNavigateToLoginScreen(navigation, dispatch);
  SimpleAlert('', API_ERR_MSG.LOGOUT_ERR);
};

export const isUpdateAlertReq = async () => {
  const TAG = isUpdateAlertReq.name;
  const latestAppVersion = await AsyncStorageUtils.getAppVersion();
  const currentAppVersion = DeviceInfo.getVersion();
  printLogs(
    TAG,
    '| Latest App Version:',
    latestAppVersion,
    '| Current App Version:',
    currentAppVersion,
  );
  if (latestAppVersion != currentAppVersion) {
    AlertWithTwoActionableOptions(
      APP_VERSION_MSG.TITLE,
      `${APP_VERSION_MSG.BODY}(${latestAppVersion})`,
      APP_VERSION_MSG.UPDATE,
      APP_VERSION_MSG.CANCEL,
      false,
      executeAction => {
        if (executeAction) {
          // redirect to app store
        }
      },
    );
  }
};

export const clearReduxStore = async (
  dispatch: ThunkDispatch<any, any, any>,
) => {
  const TAG = clearReduxStore.name;
  dispatch(setCompleteJobInfo([]));
  dispatch(
    setSelectedTruckInfo({
      id: 0,
      name: '',
      note: '',
    }),
  );
  printLogs(TAG, '| successfully');
};
