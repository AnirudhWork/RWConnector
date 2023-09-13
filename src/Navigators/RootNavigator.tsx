import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../screens/types';
import Splash from '../screens/Splash';
import Login from '../screens/Login/Login';
import DrawerNavigationContainer from '../screens/DrawerNavigationContainer';
import { SCREEN_NAMES, SCREEN_TITLES } from './constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.SPLASH}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREEN_NAMES.SPLASH} component={Splash} />
        <Stack.Screen
          name={SCREEN_NAMES.LOGIN}
          component={Login}
          options={{
            title: SCREEN_TITLES.LOGIN,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER}
          component={DrawerNavigationContainer}
          options={{
            title: SCREEN_TITLES.DRAWER_NAVIGATION_CONTAINER,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
