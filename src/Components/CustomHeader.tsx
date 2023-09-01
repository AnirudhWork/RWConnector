import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomHeaderProps} from '../screens/types';
import {DRAWER_SCREEN_NAMES} from '../Navigators/constants';

const CustomHeader: React.FC<CustomHeaderProps> = ({navigation}) => {
  const logo = require('../Assets/Icons/RWLogo.png');
  const DrawerIcon = require('../Assets/Icons/DrawerIcon.png');
  const backButton = require('../Assets/Icons/ic_back.png');

  let index = navigation.getState().index;
  let showBackButton = navigation.canGoBack() && index != 0;

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    // <View style={styles.header}>
    //   <View style={styles.logoContainer}>
    //     <Image style={styles.logo} source={logo} resizeMode="contain" />
    //   </View>
    //   <View style={styles.drawerButtonContainer}>
    //     <TouchableOpacity
    //       onPress={openDrawer}
    //       style={styles.drawerButton}
    //       hitSlop={15}>
    //       <Image
    //         source={DrawerIcon}
    //         resizeMode="contain"
    //         style={styles.drawerIcon}
    //       />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => {
            if (
              navigation.getState().routeNames[index] ==
              DRAWER_SCREEN_NAMES.JOB_DETAILS
            ) {
              showBackButton = false;
            }
            navigation.goBack();
          }}>
          <Image
            style={styles.imageMenu}
            resizeMode={'contain'}
            source={backButton}
          />
        </TouchableOpacity>
      )}
      <Image
        style={[
          styles.imageLogo,
          {
            height: 50,
            width: 30,
          },
        ]}
        source={logo}
        resizeMode={'contain'}
      />
      <TouchableOpacity style={styles.touchableMenuIcon} onPress={openDrawer}>
        <Image
          style={styles.imageMenu}
          resizeMode={'contain'}
          source={DrawerIcon}
        />
      </TouchableOpacity>
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
  container: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {flex: 1},
  touchableBackIcon: {position: 'relative', left: 10, width: 40},
  touchableMenuIcon: {position: 'relative', right: 10, width: 40},
  imageMenu: {margin: 10},
});

export default CustomHeader;
