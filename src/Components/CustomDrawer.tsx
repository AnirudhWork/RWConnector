import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const drawerClose = require('../Icons/DrawerCross.png');

  // const baseURL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

  const handleDrawerClosure = () => {
    props.navigation.closeDrawer();
  };

  const handleLogOut = async () => {
    // Remove login state and token from AsyncStorage on logout
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userToken');
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Pressable onPress={handleDrawerClosure} hitSlop={10}>
          <Image source={drawerClose} />
        </Pressable>
      </View>
      <View style={styles.content_container}>
        <View style={styles.content}>
          <View>
            <Text style={styles.textStyle}>Welcome</Text>
          </View>
          <View>
            <Text style={styles.userStyle}>Michael John</Text>
          </View>
        </View>
        <DrawerContentScrollView {...props}>
          <View style={styles.itemListStyle}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={handleLogOut}
              labelStyle={styles.textStyle}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E5549',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content_container: {
    width: '100%',
    height: '75%',
  },
  image_container: {
    width: '90%',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C8E6CA',
  },
  textStyle: {
    color: '#C8E6CA',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    paddingVertical: 5,
  },
  userStyle: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
  },
  itemListStyle: {
    marginVertical: 10,
  },
});
