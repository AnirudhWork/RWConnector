import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const drawerClose = require('../Icons/DrawerCross.png');

  const handleDrawerClosure = () => {
    props.navigation.closeDrawer();
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
              onPress={() => props.navigation.navigate('Login')}
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C8E6CA',
  },
  textStyle: {
    color: '#C8E6CA',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  userStyle: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
  },
  itemListStyle: {
    marginVertical: 10,
  },
});
