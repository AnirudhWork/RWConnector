import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api/api';
import CustomMessagePopup from './CustomMessagePopup';
import Loading from './Loading';
import axios from 'axios';
import {useAuth} from './AuthContext';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  // <-- Images and Icons -->

  const drawerClose = require('../Icons/DrawerCross.png');

  // <-- useState Declarations -->

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {userToken, setUserToken} = useAuth();

  // <-- DrawerClosure on 'X' icon press -->

  const handleDrawerClosure = () => {
    props.navigation.closeDrawer();
  };

  // <-- Logout Api -->

  const handleLogOut = async () => {
    setIsLoading(true);

    // <-- Checking if token exist -->

    if (!userToken) {
      setIsLoading(false);
      console.log('Access token not found:', userToken);
      setUserToken(null);
      await AsyncStorage.removeItem('userToken');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      return;
    }

    // <-- Expiring the token if it exist -->

    const endPoint = '/auth/logout';

    try {
      const response = await Api(endPoint);
      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    } catch (error) {
      const KnownError = error as any;
      // <-- If request is canceled -->
      if (axios.isCancel(error)) {
        setPopUpMessage('Request interrupted, please try again!');
        setShowPopUp(true);
        // <-- If response from server is 401 -->
      } else if (KnownError.response && KnownError.response.status === 401) {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        // <-- If there is error sending request to the server -->
      } else if (KnownError.request) {
        setPopUpMessage(
          'Network Error! Please check your internet connection and try again!',
        );
        setShowPopUp(true);
        // <-- All other cases -->
      } else {
        setPopUpMessage('Error while trying to logout. Please try again!');
        setShowPopUp(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      {showPopUp && (
        <CustomMessagePopup
          visible={showPopUp}
          message={popUpMessage}
          setPopUpMessage={setPopUpMessage}
          setShowPopUp={setShowPopUp}
        />
      )}
      {isLoading && <Loading visible={isLoading} />}
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

// <-- Styles -->

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
