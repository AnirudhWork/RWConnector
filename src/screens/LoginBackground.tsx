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

const LoginBackground: React.FC<LoginBackgroundProps> = ({
  navigation,
  setIsForgotPassword,
}) => {
  const usernameIcon = require('../Icons/Username.png');
  const passwordIcon = require('../Icons/PasswordLock.png');
  const passwordShownIcon = require('../Icons/PasswordShown.png');
  const passwordHiddenIcon = require('../Icons/PasswordHidden.png');

  let [passwordShown, setPasswordShown] = useState({
    showPassword: false,
    passwordIcon: passwordHiddenIcon,
  });

  const refPassword = useRef<TextInput>(null);
  const refUsername = useRef<TextInput>(null);

  const keyboardDidHideCallback = () => {
    refUsername.current?.blur();
    refPassword.current?.blur();
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideCallback,
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  let handleShowPassword = () => {
    setPasswordShown(previousIcon => ({
      showPassword: !previousIcon.showPassword,
      passwordIcon: previousIcon.showPassword
        ? passwordShownIcon
        : passwordHiddenIcon,
    }));
  };

  let handleSubmit = () => {
    // navigation.replace('Main');
    navigation.navigate('DrawerNavigationContainer');
  };

  return (
    <View style={styles.login_content}>
      <View style={styles.input_container}>
        <View style={styles.input_icon_container}>
          <Image source={usernameIcon} style={styles.input_icons} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#BCBCBC"
            returnKeyType="next"
            ref={refUsername}
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
            onSubmitEditing={() => {
              navigation.navigate('DrawerNavigationContainer');
            }}
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
