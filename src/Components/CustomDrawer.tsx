import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AlertWithTwoActionableOptions, SimpleAlert } from '../Utils/SimpleAlert';
import Loading from './Loading';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorageUtils, logoutSessionExpired } from '../Utils/constants';
import {
  API_ENDPOINT,
  API_ERR_MSG,
  STATUS_CODES,
  logoutAndNavigateToLoginScreen,
} from '../Api/constants';
import { DRAWER_SCREEN_NAMES } from '../Navigators/constants';
import { CustomDrawerNavigationProps } from './types';
import { printLogs } from '../Utils/log-utils';
import { APIServices } from '../Api/api-services';
import { useAuth } from './AuthContext';

const CustomDrawer: React.FC<CustomDrawerNavigationProps> = ( { navigation } ) => {
  // <-- Images and Icons -->

  const drawerClose = require( '../Assets/Icons/DrawerCross.png' );

  // <-- useState Declarations -->

  const [isLoading, setIsLoading] = useState( false );
  const [appVersion, setAppVersion] = useState<string>( '' );
  const [username, setUsername] = useState<string>( '' );
  let { data, setData } = useAuth();

  // <-- useEffect -->

  useEffect( () => {
    const requiredInfo = async () => {
      setAppVersion( await AsyncStorageUtils.getAppVersion() );
      setUsername( await AsyncStorageUtils.getUsername() );
    };
    requiredInfo();
  }, [] );

  // <-- DrawerClosure on 'X' icon press -->

  const handleDrawerClosure = () => {
    navigation.closeDrawer();
  };

  // <-- On Jobs button click -->

  const returnToDashboard = () => {
    setData( '#007f00' );
    navigation.closeDrawer();
    navigation.navigate( DRAWER_SCREEN_NAMES.TRUCK_LIST );
  };

  // <-- Confirm Logout Pop-up -->

  const confirmLogOut = () => {
    navigation.closeDrawer();
    AlertWithTwoActionableOptions(
      '',
      'Are you sure you want to logout?',
      'Yes',
      'No',
      true,
      executeAction => {
        if ( executeAction ) {
          handleLogOut();
        }
      },
    );
  };

  // <-- Logout Api -->

  const handleLogOut = async () => {
    const TAG = handleLogOut.name;
    setIsLoading( true );

    // <-- Checking if token exist -->

    const userToken = await AsyncStorageUtils.getUserToken();
    if ( !userToken ) {
      setIsLoading( false );
      printLogs( TAG, '| Logout API, user token not found. usertoken:', userToken );
      logoutAndNavigateToLoginScreen( navigation );
      return;
    }

    // <-- Expiring the token if it exist -->

    try {
      const response = await new APIServices( true, navigation ).post( API_ENDPOINT.LOGOUT );
      if ( response?.status === STATUS_CODES.SUCCESS ) {
        logoutAndNavigateToLoginScreen( navigation );
      }
    } catch ( error ) {
      if ( axios.isCancel( error ) ) {
        SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
      } else {
        printLogs( TAG, '| Error', error );
        logoutSessionExpired( navigation );
      }
    } finally {
      setIsLoading( false );
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      {isLoading && <Loading visible={isLoading} />}
      <View style={styles.drawerCloseIconContainer}>
        <TouchableOpacity
          onPress={handleDrawerClosure}
          style={styles.drawerCloseButton}>
          <Image source={drawerClose} style={styles.drawerCloseIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <View>
            <Text style={styles.titleText}>Welcome</Text>
          </View>
          <View>
            <Text style={styles.userNameText}>{username}</Text>
          </View>
        </View>
        <DrawerContentScrollView>
          <View>
            {/* <DrawerItemList />*/}
            <View>
              <TouchableOpacity
                style={[styles.customDrawerActiveItemContainer, { backgroundColor: data }]}
                onPress={returnToDashboard}>
                <Text style={styles.customDrawerItem}>Jobs</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.customDrawerInactiveItemContainer}
                onPress={confirmLogOut}>
                <Text style={styles.customDrawerItem}>Logout</Text>
              </TouchableOpacity>
            </View>
            {/* <DrawerItem
              label="Logout"
              onPress={confirmLogOut}
              labelStyle={styles.titleText}
            /> */}
          </View>
        </DrawerContentScrollView>
        <View style={styles.appVersionContainer}>
          <Text style={styles.appVersionText}>App version - {appVersion}</Text>
        </View>
      </View>
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#4e5549',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '80%',
  },
  drawerCloseIconContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  drawerCloseButton: {
    paddingHorizontal: 23,
    paddingVertical: 20,
  },
  drawerCloseIcon: {
    height: 20,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#C8E6CA',
  },
  titleText: {
    color: '#FFF',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  userNameText: {
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  customDrawerActiveItemContainer: {
    // backgroundColor: '#007f00',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderColor: '#C8E6CA',
    borderTopWidth: 2,
  },
  customDrawerInactiveItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  customDrawerItem: {
    color: '#C8E6CA',
    fontSize: 15,
    fontWeight: '600',
  },
  appVersionContainer: {
    flex: 1,
    alignItems: 'center',
  },
  appVersionText: {
    color: '#bedbc0',
    marginTop: 60,
  },
} );

export default CustomDrawer;
