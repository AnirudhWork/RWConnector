import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../screens/types';
import Splash from '../screens/Splash';
import Login from '../screens/Login/Login';
import DrawerNavigationContainer from '../screens/DrawerNavigationContainer';
import {SCREEN_NAMES} from './constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAMES.SPLASH}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name={SCREEN_NAMES.LOGIN}
          component={Login}
          options={{
            title: 'Login Page',
          }}
        />
        {/* <Stack.Screen
          name={SCREEN_NAMES.LOGIN_BACKGROUND}
          component={LoginBackground}
          options={{
            title: 'LoginBackground Page',
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.FORGOT_PWD}
          component={ForgotPassword}
          options={{
            title: 'Forgot Password',
          }}
        /> */}
        <Stack.Screen
          name={SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER}
          component={DrawerNavigationContainer}
          options={{
            title: 'DrawerNavigationContainer',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
