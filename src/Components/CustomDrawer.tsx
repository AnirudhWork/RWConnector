import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import postApi from '../Api/postAPI';
import {AlertWithTwoActionableOptions, SimpleAlert} from '../Utils/SimpleAlert';
import Loading from './Loading';
import axios from 'axios';
import {useAuth} from './AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AsyncStorageUtils} from '../Utils/constants';
import {
  API_ENDPOINT,
  API_ERR_MSG,
  STATUS_CODES,
  logoutAndNavigateToLoginScreen,
} from '../Api/constants';
import {CustomDrawerNavigationProps} from './types';
import {SCREEN_NAMES} from '../Navigators/constants';

const CustomDrawer: React.FC<CustomDrawerNavigationProps> = ({navigation}) => {
  // <-- Images and Icons -->

  const drawerClose = require('../Assets/Icons/DrawerCross.png');

  // <-- useState Declarations -->

  const [isLoading, setIsLoading] = useState(false);

  // <-- useContext -->

  const {data} = useAuth();

  // <-- DrawerClosure on 'X' icon press -->

  const handleDrawerClosure = () => {
    navigation.closeDrawer();
  };

  // <-- On Jobs button click -->

  const returnToDashboard = () => {
    navigation.closeDrawer();
    navigation.navigate(SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER);
  };

  // <-- Confirm Logout Pop-up -->

  const confirmLogOut = () => {
    navigation.closeDrawer();
    AlertWithTwoActionableOptions(
      '',
      'Are you sure you want to logout?',
      'Yes',
      'No',
      true,
      executeAction => {
        if (executeAction) {
          handleLogOut();
        }
      },
    );
  };

  // <-- Logout Api -->

  const handleLogOut = async () => {
    setIsLoading(true);

    // <-- Checking if token exist -->

    const userToken = await AsyncStorageUtils.getUserToken();
    if (!userToken) {
      setIsLoading(false);
      console.log('\n\n\nLogout API, user token not found:', userToken);
      logoutAndNavigateToLoginScreen(navigation);
    }

    // <-- Expiring the token if it exist -->

    try {
      const response = await postApi(API_ENDPOINT.LOGOUT);
      if (response.status === STATUS_CODES.SUCCESS) {
        logoutAndNavigateToLoginScreen(navigation);
      }
    } catch (error) {
      const KnownError = error as any;
      // <-- If request is canceled -->
      if (axios.isCancel(error)) {
        SimpleAlert('', API_ERR_MSG.REQ_CANCEL_ERR);
        // <-- If response from server is 401 -->
      } else if (
        KnownError.response ||
        KnownError.response?.status === STATUS_CODES.UNAUTHORIZED
      ) {
        console.log(
          'Invalid response from server:',
          KnownError.response?.status,
        );
        logoutAndNavigateToLoginScreen(navigation);
        // <-- If there is error sending request to the server -->
      } else if (KnownError.request) {
        console.log('\n\nRequest error:', KnownError.request);
        SimpleAlert('', API_ERR_MSG.INTERNET_ERR);
        // <-- All other cases -->
      } else {
        console.log('\n\nError', KnownError);
        SimpleAlert('', API_ERR_MSG.ERR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      {isLoading && <Loading visible={isLoading} />}
      <View style={styles.drawerCloseIconContainer}>
        <TouchableOpacity
          onPress={handleDrawerClosure}
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
            <Text style={styles.userNameText}>{data?.username}</Text>
          </View>
        </View>
        <DrawerContentScrollView>
          <View>
            {/* <DrawerItemList />*/}
            <View>
              <TouchableOpacity
                style={styles.customDrawerActiveItemContainer}
                onPress={returnToDashboard}>
                <Text style={styles.customDrawerItem}>Jobs</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.customDrawerInactiveItemContainer}
                onPress={confirmLogOut}>
                <Text style={styles.customDrawerItem}>Logout</Text>
              </TouchableOpacity>
            </View>
            {/* <DrawerItem
              label="Logout"
              onPress={confirmLogOut}
              labelStyle={styles.titleText}
            /> */}
          </View>
        </DrawerContentScrollView>
        <View style={styles.appVersionContainer}>
          <Text style={styles.appVersionText}>
            App version - {data?.appVersion}
          </Text>
        </View>
      </View>
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4e5549',
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
    marginBottom: 15,
  },
  drawerCloseButton: {
    paddingHorizontal: 23,
    paddingVertical: 20,
  },
  drawerCloseIcon: {
    height: 20,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
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
  customDrawerActiveItemContainer: {
    backgroundColor: '#007f00',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderColor: '#C8E6CA',
    borderTopWidth: 2,
  },
  customDrawerInactiveItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  customDrawerItem: {
    color: '#C8E6CA',
    fontSize: 15,
    fontWeight: '600',
  },
  appVersionContainer: {
    flex: 1,
    alignItems: 'center',
  },
  appVersionText: {
    color: '#bedbc0',
    marginTop: 60,
  },
});

export default CustomDrawer;
