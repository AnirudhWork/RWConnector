import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import DrawerNavigator from '../Navigators/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postAPI from '../Api/postAPI';
import axios from 'axios';
import {DrawerNavigationContainerProps} from './types';

const DrawerNavigationContainer: React.FC<
  DrawerNavigationContainerProps
> = () => {
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
