import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomHeaderProps} from '../screens/types';

const CustomHeader: React.FC<CustomHeaderProps> = ({navigation}) => {
  const logo = require('../Assets/Icons/RWLogo.png');
  const DrawerIcon = require('../Assets/Icons/DrawerIcon.png');

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
      </View>
      <View style={styles.drawerButtonContainer}>
        <TouchableOpacity
          onPress={openDrawer}
          style={styles.drawerButton}
          hitSlop={15}>
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
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  drawerButtonContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
  },
  drawerButton: {
    marginRight: 20,
  },
  drawerIcon: {
    width: 24,
    height: 15,
  },
});

export default CustomHeader;
