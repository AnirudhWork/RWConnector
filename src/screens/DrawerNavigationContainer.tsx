import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import DrawerNavigator from '../Navigators/DrawerNavigator';

const DrawerNavigationContainer: FC = () => {
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
