import React from 'react';
import {
  // DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomHeader from '../Components/CustomHeader';
import CustomDrawer from '../Components/CustomDrawer';
import TruckList from '../screens/truck_selection/TrucksList';
import {StyleSheet} from 'react-native';
import {RootDrawerParamList} from '../screens/types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: props => <CustomHeader {...props} />,
        drawerPosition: 'right',
        drawerActiveBackgroundColor: '#007F00',
        drawerActiveTintColor: '#C8E6CA',
        drawerLabelStyle: styles.drawerLabelStyle,
      }}
      backBehavior="history"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="TruckList" component={TruckList} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerLabelStyle: {
    color: '#C8E6CA',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
  },
  drawerCotentContainerStyle: {
    flex: 1,
  },
});

export default DrawerNavigator;
