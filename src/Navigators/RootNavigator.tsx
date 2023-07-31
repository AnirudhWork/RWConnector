import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../screens/types';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import DrawerNavigationContainer from '../screens/DrawerNavigationContainer';
import LoginBackground from '../screens/LoginBackground';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login Page',
          }}
        />
        <Stack.Screen
          name="LoginBackground"
          component={LoginBackground}
          options={{
            title: 'LoginBackground Page',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password',
          }}
        />
        <Stack.Screen
          name="DrawerNavigationContainer"
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
