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
import { SimpleAlert } from '../../Utils/SimpleAlert';
import { LOGIN_ERROR_ALERTS, decryptPassword } from './constants';
import { validateLoginCred } from '../../Api/api-requests/LoginPwApi';
import { API_ERR_MSG } from '../../Api/constants';
import { printLogs } from '../../Utils/log-utils';

const LoginBackground: React.FC<LoginBackgroundProps> = ( {
  navigation,
  setIsForgotPassword,
  setIsLoading
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
        const passwordHashValue = decryptPassword( passwordValue );
        await validateLoginCred( userNameValue, passwordHashValue, navigation );
      } catch ( error ) {
        printLogs( TAG, '| DecryptPassword failed or ValidateLoginCred Method failed. ErrorMsg:', error );
        SimpleAlert( '', API_ERR_MSG.ERR );
      } finally {
        setIsLoading( false );
      }
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
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
