import {View, Image, StyleSheet, ScrollView, Text} from 'react-native';
import LoginBackground from './LoginBackground';
import ForgotPassword from './ForgotPassword';

import {LoginProps} from './types';
import {useState} from 'react';

const Login: React.FC<LoginProps> = ({navigation, route}: LoginProps) => {
  let [isForgotPassword, setIsForgotPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const loginImage = require('../Assets/Images/TruckLogin.png');
  const logo = require('../Assets/Icons/RWLogo.png');

  return (
    <View style={styles.container}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{flexGrow: 1}}>
        {/* 1 View */}
        <View style={styles.content_container}>
          <Image source={logo} />
          <View style={styles.content}>
            {/* Dynamic View Starts */}
            {isForgotPassword ? (
              <ForgotPassword
                navigation={navigation}
                route={route}
                setIsForgotPassword={setIsForgotPassword}
                setSubmitted={setSubmitted}
              />
            ) : (
              <LoginBackground
                setIsForgotPassword={setIsForgotPassword}
                navigation={navigation}
                route={route}
              />
            )}
            {/* Dynamic View Ends */}
          </View>
          {/* ForgotPW Confirmation View */}
          {submitted && (
            <View style={styles.confirmationMessage_container}>
              <View style={styles.confirmationMessage_content}>
                <Text style={styles.confirmationMessage}>
                  Password successfully sent to the provided Email Address.
                </Text>
              </View>
            </View>
          )}
        </View>
        {/* 2 View */}
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={loginImage}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content_container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 24,
  },
  content: {
    width: '100%',
    height: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image_container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    aspectRatio: 3 / 2,
    height: undefined,
    width: '100%',
  },
  confirmationMessage_container: {
    width: '80%',
    backgroundColor: 'rgba(217, 237, 247, 1)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  confirmationMessage_content: {
    width: '100%',
    height: 'auto',
  },
  confirmationMessage: {
    color: '#037F01',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
});

export default Login;
