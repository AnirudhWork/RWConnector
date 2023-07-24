import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { CustomHeaderProps } from '../screens/types';

const CustomHeader: React.FC<CustomHeaderProps> = ({navigation}) => {
  const logo = require('../Icons/RWLogo.png');
  const DrawerIcon = require('../Icons/DrawerIcon.png');

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <View style={styles.header_content}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <TouchableOpacity onPress={openDrawer} 
        style={styles.drawerButton}
        activeOpacity={0.8}
        >
          <Image
            source={DrawerIcon}
            resizeMode="contain"
            style={styles.drawerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    height: 105,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  header_content: {
    height: '80%',
    width: '80%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  logo: {
    width: 200,
    height: 60,
  },
  drawerButton: {
    paddingHorizontal: 10,
    paddingVertical: 'auto',
  },
  drawerIcon: {
    width: 24,
    height: 20,
  },
});

export default CustomHeader;