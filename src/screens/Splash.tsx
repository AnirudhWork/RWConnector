import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SplashProps } from './types';
import { AsyncStorageUtils } from '../Utils/constants';
import { printLogs } from '../Utils/log-utils';

const Splash: React.FC<SplashProps> = ( { navigation } ) => {
  useEffect( () => {
    checkInitialRoute();
  }, [] );

  const checkInitialRoute = async () => {
    const TAG = checkInitialRoute.name;
    const isLoggedIn = await AsyncStorageUtils.getUserToken();
    printLogs( TAG, '| is user logged in:', isLoggedIn );
    const route = isLoggedIn ? 'DrawerNavigationContainer' : 'Login';
    setTimeout( () => {
      navigation.replace( route );
    }, 2500 );
  };

  const logo = require( '../Assets/Icons/RWLogo.png' );
  return (
    <View style={styles.container}>
      <Image source={logo}></Image>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
} );
