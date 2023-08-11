import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import DrawerNavigator from '../Navigators/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postAPI from '../Api/postAPI';
import axios from 'axios';
import {DrawerNavigationContainerProps} from './types';

const DrawerNavigationContainer: React.FC<DrawerNavigationContainerProps> = ({
  navigation,
}) => {
  useEffect(() => {
    const refreshToken = async () => {
      const getTokenExpiration = await AsyncStorage.getItem('expiryDate');
      if (!getTokenExpiration) {
        return;
      }
      const tokenExpiration = parseInt(getTokenExpiration);
      const tresHoldValue = 600000; // 10 mins
      const remainingTime = tokenExpiration - Math.round(Date.now() / 1000);
      if (remainingTime >= tresHoldValue) {
        return;
      }
      const userToken = await AsyncStorage.getItem('userToken');
      const endPoint = '/auth/renew';
      const headers = {
        Authentication: `Bearer ${userToken}`,
        Accept: 'application/json',
      };
      try {
        const response = await postAPI(endPoint, headers);
        if (response.status === 200) {
          await AsyncStorage.setItem('userToken', response.data.token);
          await AsyncStorage.setItem(
            'expiryDate',
            JSON.stringify(response.data['expire-time']),
          );
          console.log(
            '\n\n\nAuthentication token renewed:',
            response.data.token,
            'Expiry time:',
            response.data['expire-time'],
          );
        }
      } catch (error) {
        const knowError = error as any;
        if (axios.isCancel(knowError)) {
          console.log('Request was canceled');
        } else if (knowError.request) {
          console.log('Request error:', knowError.request);
        } else if (knowError.response?.status === 401) {
          console.log('401 Response error:', knowError.response);
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        } else {
          console.log('Error processing request:', knowError);
        }
      }
    };
    refreshToken();
  }, []);
  return (
    <View style={styles.container}>
      <DrawerNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerNavigationContainer;
