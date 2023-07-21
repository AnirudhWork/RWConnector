import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {LoginProps} from './types';

const Login: React.FC<LoginProps> = ({navigation}) => {
  const logo = require('../Icons/RWLogo.png');
  const loginImage = require('../Images/TruckLogin.png');
  const usernameIcon = require('../Icons/Username.png');
  const passwordIcon = require('../Icons/PasswordLock.png');
  const showPassword = require('../Icons/ShowPassword.png');

  let handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  let handleSubmit = () => {
    // navigation.replace('Main');
    navigation.navigate('Main');
  };

  return (
    <ScrollView style={styles.container}
    contentContainerStyle={styles.container}
    >
      <View style={styles.login_container}>
        <View style={styles.login_content}>
          <View>
            <Image source={logo} />
          </View>
          <View style={styles.input_container}>
            <View style={styles.input_icon_container}>
              <Image source={usernameIcon} style={styles.input_icons} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#BCBCBC"
              />
            </View>
            <View style={styles.input_icon_container}>
              <Image source={passwordIcon} style={styles.input_icons} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#BCBCBC"
                secureTextEntry
                returnKeyType="done"
              />
              <TouchableOpacity activeOpacity={1} style={{bottom: 7}}>
                <Image source={showPassword} style={styles.showPassword} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.9}>
              <Text onPress={handleForgotPassword} style={{color: 'white'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.image_container}>
        <Image style={styles.image} resizeMode="stretch" source={loginImage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
  login_container: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image_container: {
    flex: 0.4,
    width: '100%',
  },
  login_content: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 2,
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
});

export default Login;
