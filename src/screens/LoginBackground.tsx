import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import {LoginBackgroundProps} from './types';
import axios from 'axios';
import loginUser from '../Api/LoginAPI';
import CustomMessagePopup from '../Components/CustomMessagePopup';

const LoginBackground: React.FC<LoginBackgroundProps> = ({
  navigation,
  setIsForgotPassword,
}) => {
  // <-- Images and Icons -->
  const usernameIcon = require('../Icons/Username.png');
  const passwordIcon = require('../Icons/PasswordLock.png');
  const passwordShownIcon = require('../Icons/PasswordShown.png');
  const passwordHiddenIcon = require('../Icons/PasswordHidden.png');

  // <-- useState declarations -->
  let [passwordShown, setPasswordShown] = useState({
    showPassword: false,
    passwordIcon: passwordHiddenIcon,
  });
  const [passwordValue, setPasswordValue] = useState('');
  const [userNameValue, setUsernameValue] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  // <-- useRef declarations -->
  const refPassword = useRef<TextInput>(null);
  const refUsername = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideCallback,
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  // <-- Functions -->
  const keyboardDidHideCallback = () => {
    refUsername.current?.blur();
    refPassword.current?.blur();
  };

  let handleShowPassword = () => {
    setPasswordShown(previousIcon => ({
      showPassword: !previousIcon.showPassword,
      passwordIcon: previousIcon.showPassword
        ? passwordShownIcon
        : passwordHiddenIcon,
    }));
  };

  let handleSubmit = async () => {
    if (!userNameValue.trim() || !passwordValue.trim()) {
      setPopUpMessage('Please fill all the required fields');
      setShowPopUp(true);
    } else {
      try {
        const response = await loginUser(userNameValue, passwordValue);
        if (response.status === 200) {
          // remove all the screens from the stack and replace it with a new stack where the DrawerNavigationContainer is the first element in the new stack.
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
        }
        setShowPopUp(true);
      }
    }
  };

  return (
    <View style={styles.login_content}>
      {showPopUp && (
        <CustomMessagePopup
          message={popUpMessage}
          visible={showPopUp}
          setShowPopUp={setShowPopUp}
          setPopUpMessage={setPopUpMessage}
        />
      )}
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
          <Pressable
            hitSlop={10}
            style={styles.showPassword}
            onPress={handleShowPassword}>
            <Image source={passwordShown.passwordIcon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
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
  login_content: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input_container: {
    width: '90%',
    alignItems: 'center',
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
    fontSize: 14,
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#C2C2C2',
  },
  button_container: {
    width: '80%',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    width: '100%',
    color: 'white',
    fontSize: 14,
    backgroundColor: '#007F00',
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
    marginTop: 15,
  },
});
