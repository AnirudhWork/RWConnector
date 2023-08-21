import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import POST_API from '../Api/postAPI';
import CustomMessagePopup from './CustomMessagePopup';
import Loading from './Loading';
import axios from 'axios';
import {useAuth} from './AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  // <-- Images and Icons -->

  const drawerClose = require('../Assets/Icons/DrawerCross.png');

  // <-- useState Declarations -->

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [handleLogOutConfirmation, setHandleLogOutConfirmation] =
    useState(false);

  // <-- useContext -->
  const {data} = useAuth();

  // <-- DrawerClosure on 'X' icon press -->

  const handleDrawerClosure = () => {
    props.navigation.closeDrawer();
  };

  // <-- Confirm Logout Pop-up -->

  const confirmLogOut = () => {
    setPopUpMessage('Are you sure you want to log out?');
    setHandleLogOutConfirmation(true);
    setShowPopUp(true);
  };

  // <-- Logout Api -->

  const handleLogOut = async () => {
    setIsLoading(true);

    // <-- Checking if token exist -->

    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      setIsLoading(false);
      console.log('\n\nuserToken not found:', userToken);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('username');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      return;
    }

    // <-- Expiring the token if it exist -->

    const endPoint = '/auth/logout';

    try {
      const response = await POST_API(endPoint);
      if (response.status === 200) {
        console.log('\n\nlogout successful:', response.status);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('username');
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
      } else if (KnownError.response?.status === 401) {
        console.log(
          'Invalid response from server:',
          KnownError.response?.status,
        );
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('username');
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        // <-- If there is error sending request to the server -->
      } else if (KnownError.request) {
        console.log('\n\nRequest error:', KnownError.request);
        setPopUpMessage(
          'Network Error! Please check your internet connection and try again!',
        );
        setShowPopUp(true);
        // <-- All other cases -->
      } else {
        console.log('\n\nError', KnownError);
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
          onClearMessage={handleLogOut}
          setConfirmLogOut={[
            handleLogOutConfirmation,
            setHandleLogOutConfirmation,
          ]}
        />
      )}
      {isLoading && <Loading visible={isLoading} />}
      <View style={styles.drawerCloseIconContainer}>
        <TouchableOpacity
          onPress={handleDrawerClosure}
          hitSlop={20}
          style={styles.drawerCloseButton}>
          <Image source={drawerClose} style={styles.drawerCloseIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <View>
            <Text style={styles.titleText}>Welcome</Text>
          </View>
          <View>
            <Text style={styles.userNameText}>{data}</Text>
          </View>
        </View>
        <DrawerContentScrollView {...props}>
          <View style={styles.itemListStyle}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={confirmLogOut}
              labelStyle={styles.titleText}
            />
            <View
              style={{
                backgroundColor: '#007F00',
                marginVertical: 10,
                paddingVertical: 15,
              }}>
              <TouchableOpacity style={{paddingHorizontal: 15}}>
                <Text
                  style={{color: '#C8E6CA', fontSize: 15, fontWeight: '600'}}>
                  Jobs
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E5549',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '80%',
  },
  drawerCloseIconContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  drawerCloseButton: {
    paddingHorizontal: 23,
    paddingVertical: 10,
  },
  drawerCloseIcon: {
    height: 20,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C8E6CA',
  },
  titleText: {
    color: '#FFF',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  userNameText: {
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  itemListStyle: {
    marginVertical: 10,
  },
});

export default CustomDrawer;
