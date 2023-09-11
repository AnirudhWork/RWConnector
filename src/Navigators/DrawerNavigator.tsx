import React from 'react';
import {
  // DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomHeader from '../Components/CustomHeader';
import CustomDrawer from '../Components/CustomDrawer';
import TruckList from '../screens/truck_selection/TrucksList';
import { StyleSheet } from 'react-native';
import { RootDrawerParamList } from '../screens/types';
import { DRAWER_SCREEN_NAMES } from './constants';
import JobDetails from '../screens/Jobs_Details/JobDetails';

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
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={DRAWER_SCREEN_NAMES.TRUCK_LIST}>
      <Drawer.Screen
        name={DRAWER_SCREEN_NAMES.TRUCK_LIST}
        component={TruckList}
      />
      <Drawer.Screen
        name={DRAWER_SCREEN_NAMES.JOB_DETAILS}
        component={JobDetails}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create( {
  drawerCotentContainerStyle: {
    flex: 1,
  },
  drawerLabelStyle: {
    color: '#C8E6CA',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
  },
} );

export default DrawerNavigator;
