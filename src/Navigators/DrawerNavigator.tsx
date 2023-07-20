import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';

const Drawer = createDrawerNavigator();

const DrawerNavigator = (): React.JSX.Element => {
  return (
    <Drawer.Navigator
    screenOptions={{headerShown:true}}
    backBehavior='history'> 
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Contact" component={Contact} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
