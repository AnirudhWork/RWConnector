import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { LoginBackgroundProps } from '../types';
import axios from 'axios';
import { SimpleAlert } from '../../Utils/SimpleAlert';
import Loading from '../../Components/Loading';

// import postApi from '../../Api/postAPI';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useAuth} from '../../Components/AuthContext';
import { LOGIN_ERROR_ALERTS, encryptPassword } from './constants';
import { API_ENDPOINT, API_ERR_MSG, IsInternetAccessAvailable, STATUS_CODES } from '../../Api/constants';
import { SCREEN_NAMES } from '../../Navigators/constants';
import { AsyncStorageUtils } from '../../Utils/constants';
import { APIServices } from '../../Api/api-services';
import { printLogs } from '../../Utils/log-utils';

const LoginBackground: React.FC<LoginBackgroundProps> = ( {
  navigation,
  setIsForgotPassword,
} ) => {
  // <-- Images and Icons -->
  const usernameIcon = require( '../../Assets/Icons/Username.png' );
  const passwordIcon = require( '../../Assets/Icons/PasswordLock.png' );
  const passwordShownIcon = require( '../../Assets/Icons/PasswordShown.png' );
  const passwordHiddenIcon = require( '../../Assets/Icons/PasswordHidden.png' );

  // <-- useContext -->
  // const {setData} = useAuth();

  // <-- useState declarations -->
  let [passwordShown, setPasswordShown] = useState( {
    showPassword: true,
    passwordIcon: passwordHiddenIcon,
  } );
  const [passwordValue, setPasswordValue] = useState( '' );
  const [userNameValue, setUsernameValue] = useState( '' );
  const [isLoading, setIsLoading] = useState( false );

  // <-- useRef declarations -->
  const refPassword = useRef<TextInput>( null );
  const refUsername = useRef<TextInput>( null );

  // useEffect(() => {
  //   const keyboardDidHideSubscription = Keyboard.addListener(
  //     'keyboardDidHide',
  //     keyboardDidHideCallback,
  //   );
  //   return () => {
  //     keyboardDidHideSubscription?.remove();
  //   };
  // }, []);

  // <-- Functions -->

  // <-- Handle Hardware Back Button -->
  // const keyboardDidHideCallback = () => {
  //   refUsername.current?.blur();
  //   refPassword.current?.blur();
  // };

  // <-- Show/Hide Password -->
  let handleShowPassword = () => {
    setPasswordShown( previousIcon => ( {
      showPassword: !previousIcon.showPassword,
      passwordIcon: previousIcon.showPassword
        ? passwordShownIcon
        : passwordHiddenIcon,
    } ) );
  };

  // <-- Api -->
  let loginVerification = async () => {
    const TAG = loginVerification.name;
    // <-- Field Validation -->
    if ( !userNameValue.trim() || !passwordValue.trim() ) {
      SimpleAlert( '', LOGIN_ERROR_ALERTS.EMPTY_FIELDS );
    } else {
      setIsLoading( true );
      try {
        // <-- API parameters -->
        const passwordHashValue = encryptPassword( passwordValue );
        const data = {
          uname: userNameValue,
          pwd: passwordHashValue,
          'app-version': '1',
          'os-version': '1',
          'device-type': 'a',
        };

        // <-- Token generation (Login) -->
        const response = await new APIServices( false, navigation ).post(
          API_ENDPOINT.LOGIN,
          data,
        );
        if ( response?.status === STATUS_CODES.SUCCESS ) {
          printLogs( TAG, '| successful login response data:', response.data );
          AsyncStorageUtils.setLoginResponse( response.data );
          // setData({
          //   username: userNameValue,
          //   appVersion: response.data['latest-app-ver'],
          // });
          navigation.reset( {
            index: 0,
            routes: [{ name: SCREEN_NAMES.DRAWER_NAVIGATION_CONTAINER }],
          } );
        }
      } catch ( error ) {
        const knownError = error as any;
        if ( axios.isCancel( error ) ) {
          SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
        } else if ( IsInternetAccessAvailable( knownError.response?.status ) && knownError.response.status === STATUS_CODES.UNAUTHORIZED ) {
          SimpleAlert( '', LOGIN_ERROR_ALERTS.LOGIN_API_ERR );
        } else {
          SimpleAlert( '', API_ERR_MSG.ERR );
          printLogs( TAG, '| API Error:', error );
        }
      } finally {
        setIsLoading( false );
      }
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      {isLoading && <Loading visible={isLoading} />}
      <View style={styles.input_container}>
        <View style={styles.input_icon_container}>
          <Image source={usernameIcon} style={styles.input_icons} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#BCBCBC"
            returnKeyType="next"
            ref={refUsername}
            onChangeText={text => setUsernameValue( text )}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              refPassword.current?.focus();
            }}
          />
        </View>
        <View style={styles.input_icon_container}>
          <Image source={passwordIcon} style={styles.input_icons} />
          <TextInput
            style={[styles.input, { fontSize: 16 }]}
            placeholder="Password"
            ref={refPassword}
            placeholderTextColor="#BCBCBC"
            secureTextEntry={passwordShown.showPassword}
            returnKeyType="done"
            onChangeText={text => setPasswordValue( text )}
            onSubmitEditing={loginVerification}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            hitSlop={10}
            style={styles.showPassword}
            onPress={handleShowPassword}>
            <Image source={passwordShown.passwordIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={loginVerification}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          hitSlop={20}
          onPress={() => {
            setIsForgotPassword( true );
          }}>
          <Text style={styles.forgetPasswordStyles}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  input_container: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  input_icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 60,
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    backgroundColor: 'white',
    borderColor: '#C2C2C2',
  },
  button: {
    width: '100%',
    backgroundColor: '#007F00',
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input_icons: {
    position: 'absolute',
    left: 10,
    zIndex: 2,
  },
  showPassword: {
    position: 'absolute',
    right: 20,
  },
  forgetPasswordStyles: {
    color: 'white',
    fontSize: 14,
  },
} );

export default LoginBackground;
