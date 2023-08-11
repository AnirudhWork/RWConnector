import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import {LoginBackgroundProps} from './types';
import axios from 'axios';
import CustomMessagePopup from '../Components/CustomMessagePopup';
import Loading from '../Components/Loading';
import {stringMd5} from 'react-native-quick-md5';
import Api from '../Api/postAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../Components/AuthContext';

const LoginBackground: React.FC<LoginBackgroundProps> = ({
  navigation,
  setIsForgotPassword,
}) => {
  // <-- Images and Icons -->
  const usernameIcon = require('../Assets/Icons/Username.png');
  const passwordIcon = require('../Assets/Icons/PasswordLock.png');
  const passwordShownIcon = require('../Assets/Icons/PasswordShown.png');
  const passwordHiddenIcon = require('../Assets/Icons/PasswordHidden.png');

  // <-- useState declarations -->
  let [passwordShown, setPasswordShown] = useState({
    showPassword: true,
    passwordIcon: passwordHiddenIcon,
  });
  const [passwordValue, setPasswordValue] = useState('');
  const [userNameValue, setUsernameValue] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // <-- useContext declarations -->
  const {setUserToken} = useAuth();

  // <-- useRef declarations -->
  const refPassword = useRef<TextInput>(null);
  const refUsername = useRef<TextInput>(null);

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
    setPasswordShown(previousIcon => ({
      showPassword: !previousIcon.showPassword,
      passwordIcon: previousIcon.showPassword
        ? passwordShownIcon
        : passwordHiddenIcon,
    }));
  };

  // <-- Api -->
  let handleSubmit = async () => {
    // // <-- Field Validation -->
    if (!userNameValue.trim() || !passwordValue.trim()) {
      setPopUpMessage('Please fill all the required fields');
      setShowPopUp(true);
    } else {
      setIsLoading(true);
      try {
        // <-- API parameters -->
        const passwordHashValue = stringMd5(passwordValue);
        const data = {
          uname: userNameValue,
          pwd: passwordHashValue,
          'app-version': '1',
          'os-version': '1',
          'device-type': 'a',
        };
        const header = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        const endPoint = '/auth/login';

        // <-- Token generation (Login) -->
        const response = await Api(endPoint, header, data);
        if (response.status === 200) {
          console.log('\n\n\nData:', response.data);
          await AsyncStorage.setItem('userToken', response.data.token);
          setUserToken(response.data.token);
          // removes all the screens from the stack and replace it with a new stack where the DrawerNavigationContainer is the first element in the new stack.
          navigation.reset({
            index: 0,
            routes: [{name: 'DrawerNavigationContainer'}],
          });
        }
      } catch (error) {
        const knownError = error as any;
        if (axios.isCancel(error)) {
          setPopUpMessage('Request interrupted, Please try again!');
        } else if (knownError.response && knownError.response.status === 401) {
          setPopUpMessage('Invalid username or password!');
        } else if (knownError.request) {
          setPopUpMessage(
            `Network Error: Please check your internet connection and try again!`,
          );
        } else {
          setPopUpMessage('Error processing request. Please try again!');
          console.log('\n\n\n\nError:', error);
        }
        setShowPopUp(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      {showPopUp && (
        <CustomMessagePopup
          message={popUpMessage}
          visible={showPopUp}
          setShowPopUp={setShowPopUp}
          setPopUpMessage={setPopUpMessage}
        />
      )}
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
            onChangeText={text => setUsernameValue(text)}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              refPassword.current?.focus();
            }}
          />
        </View>
        <View style={styles.input_icon_container}>
          <Image source={passwordIcon} style={styles.input_icons} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            ref={refPassword}
            placeholderTextColor="#BCBCBC"
            secureTextEntry={passwordShown.showPassword}
            returnKeyType="done"
            onChangeText={text => setPasswordValue(text)}
            onSubmitEditing={handleSubmit}
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

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          hitSlop={20}
          onPress={() => {
            setIsForgotPassword(true);
          }}>
          <Text style={styles.forgetPasswordStyles}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginBackground;

// <-- Styles -->

const styles = StyleSheet.create({
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
    height: 50,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 60,
    color: '#000',
    fontSize: 16,
    backgroundColor: 'white',
    width: '100%',
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
});
