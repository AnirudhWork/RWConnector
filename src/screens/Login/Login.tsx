import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import LoginBackground from './LoginBackground';
import ForgotPassword from './ForgotPassword';

import {LoginProps} from '../types';
import {useState} from 'react';
import {FORGOT_PW_SUCCESS_ALERT} from './constants';

const Login: React.FC<LoginProps> = ({navigation}: LoginProps) => {
  let [isForgotPassword, setIsForgotPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const loginImage = require('../../Assets/Images/TruckLogin.png');
  const logo = require('../../Assets/Icons/RWLogo.png');

  const {height} = Dimensions.get('window');

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{minHeight: height - 25}}>
      {/* Main Container */}
      <View style={{flex: 1}}>
        {/* 1 View */}
        <View style={styles.content_container}>
          <View style={styles.content}>
            <View>
              <Image source={logo} />
            </View>
            {/* Dynamic View Starts */}
            {isForgotPassword ? (
              <ForgotPassword
                navigation={navigation}
                setIsForgotPassword={setIsForgotPassword}
                setSubmitted={setSubmitted}
              />
            ) : (
              <LoginBackground
                setIsForgotPassword={setIsForgotPassword}
                navigation={navigation}
              />
            )}
            {/* Dynamic View Ends */}
          </View>
          {/* ForgotPW Confirmation View */}
          {submitted && (
            <View style={styles.confirmationMessage_container}>
              <View style={styles.confirmationMessage_content}>
                <Text style={styles.confirmationMessage}>
                  {FORGOT_PW_SUCCESS_ALERT.RESET_SUCCESS}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content_container: {
    height: '70%',
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
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    height: '100%',
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
