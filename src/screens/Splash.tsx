import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SplashProps} from './types';
import {AsyncStorageUtils, isUpdateAlertReq} from '../Utils/constants';
import {printLogs} from '../Utils/log-utils';
import {globalStyles} from '../Utils/global-styles';
import {SCREEN_NAMES} from '../Navigators/constants';

const Splash: React.FC<SplashProps> = ({navigation}) => {
  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    const TAG = checkInitialRoute.name;
    const isLoggedIn = await AsyncStorageUtils.getUserToken();
    const route = isLoggedIn
      ? SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER
      : SCREEN_NAMES.LOGIN;
    setTimeout(() => {
      printLogs(TAG, '| is user logged in:', isLoggedIn ? 'Yes' : 'No');
      navigation.replace(route);
      if (route == SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER) {
        isUpdateAlertReq();
      }
    }, 2500);
  };

  const logo = require('../Assets/Icons/RWLogo.png');
  return (
    <View style={[styles.container, globalStyles.alignCenterStyle]}>
      <Image source={logo}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
});

export default Splash;
