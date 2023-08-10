import {View, Image, StyleSheet, ScrollView, Text} from 'react-native';
import LoginBackground from './LoginBackground';
import ForgotPassword from './ForgotPassword';

import {LoginProps} from './types';
import {useState} from 'react';

const Login: React.FC<LoginProps> = ({navigation, route}: LoginProps) => {
  let [isForgotPassword, setIsForgotPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const loginImage = require('../Images/TruckLogin.png');
  const logo = require('../Icons/RWLogo.png');
  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.content_container}>
        <View style={styles.content}>
          <View>
            <Image source={logo} />
          </View>
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
        </View>
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
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content_container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 24,
  },
  content: {
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_container: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 2,
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
