import { DrawerNavigationProp } from '@react-navigation/drawer'
import React from 'react'
import { LOGIN_ERROR_ALERTS, getLoginRequestBody } from '../../screens/Login/constants';
import { API_ENDPOINT, API_ERR_MSG, IsInternetAccessAvailable, STATUS_CODES, commonHeaders } from '../constants';
import { APIServices } from '../api-services';
import { AsyncStorageUtils } from '../../Utils/constants';
import { printLogs } from '../../Utils/log-utils';
import { SCREEN_NAMES } from '../../Navigators/constants';
import axios from 'axios';
import { SimpleAlert } from '../../Utils/SimpleAlert';

export const validateLoginCred = async ( username: string, password: string, navigation: DrawerNavigationProp<any, any> ) => {
  const TAG = validateLoginCred.name;
  try {
    const body = getLoginRequestBody( username, password );
    // <-- Token generation (Login) -->
    const response = await new APIServices( false, navigation ).post(
      API_ENDPOINT.LOGIN,
      body,
    );
    if ( response?.status === STATUS_CODES.SUCCESS ) {
      printLogs( TAG, '| successful login RESPONSE data:', response.data );
      const success: boolean = await AsyncStorageUtils.setLoginResponse( response.data );
      if ( success ) {
        navigation.reset( {
          index: 0,
          routes: [{ name: SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER }],
        } );
      } else {
        SimpleAlert( '', API_ERR_MSG.ERR );
      }
    }
  } catch ( error ) {
    const knownError = error as any;
    if ( axios.isCancel( error ) ) {
      SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
    } else if ( IsInternetAccessAvailable( knownError.response?.status ) && knownError.response?.status == STATUS_CODES.UNAUTHORIZED ) {
      printLogs( TAG, '| RESPONSE error with status code 401 while trying to validate user, invalid username/password. ErrorMsg:', knownError?.response );
      SimpleAlert( '', LOGIN_ERROR_ALERTS.LOGIN_API_ERR );
    } else {
      printLogs( TAG, '| Error:', error );
      SimpleAlert( '', API_ERR_MSG.ERR );
    }
  }
}

export const resetPassword = async ( email: string, navigation: DrawerNavigationProp<any, any> ) => {
  const TAG = resetPassword.name;
  const body = {
    email: email,
  }
  try {
    const response = await new APIServices( false, navigation ).post( API_ENDPOINT.FORGOT_PW, body, commonHeaders )
    if ( response?.status == STATUS_CODES.SUCCESS ) {
      return response;
    }
  } catch ( error ) {
    const knownError = error as any;
    if ( axios.isCancel( error ) ) {
      SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
    } else if ( IsInternetAccessAvailable( knownError.response?.status ) && knownError.response?.status === STATUS_CODES.UNAUTHORIZED ) {
      SimpleAlert( '', LOGIN_ERROR_ALERTS.FORGOT_PW_ERR );
    } else {
      printLogs( TAG, '| Forgot Pw error:', error );
      SimpleAlert( '', API_ERR_MSG.ERR );
    }
  }
}
