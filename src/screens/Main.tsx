import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import DrawerNavigator from '../Navigators/DrawerNavigator';
import Home from './Jobs';

const Main: FC = () => {
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

export default Main;
