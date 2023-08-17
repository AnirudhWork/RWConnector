import React from 'react';
import {StyleSheet, View} from 'react-native';
import DrawerNavigator from '../Navigators/DrawerNavigator';
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
