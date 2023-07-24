import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';
import CustomHeader from '../Components/CustomHeader';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props}/>,
        drawerPosition: 'right',
      }}
      backBehavior="history"
      >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Contact" component={Contact} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;