import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';

import {ForgotPasswordProps} from './types';
import axios from 'axios';
import Api from '../Api/api';
import CustomMessagePopup from '../Components/CustomMessagePopup';
import Loading from '../Components/Loading';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  navigation,
  setIsForgotPassword,
  setSubmitted,
}) => {
  const emailIcon = require('../Icons/EmailLogo.png');

  const [email, setEmail] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const refEmail = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideCallback,
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  const keyboardDidHideCallback = () => {
    refEmail.current?.blur();
  };

  const isValidEmail = (email: string) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // <-- Apis -->

  const handleSubmit = async () => {
    if (!email) {
      setPopUpMessage('Please enter an email address');
      setShowPopUp(true);
    } else if (!isValidEmail(email)) {
      setPopUpMessage('Please enter a valid email address');
      setShowPopUp(true);
    } else {
      setIsLoading(true);
      try {
        const data = {
          email: email,
        };
        const header = {
          'Content-Type': 'application/json',
        };
        const endPoint = '/auth/forgotpwd';

        const response = await Api(endPoint, header, data);
        if (response.status === 200) {
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setIsForgotPassword(false);
          }, 2000);
        }
      } catch (error) {
        const knownError = error as any;
        if (axios.isCancel(error)) {
          setPopUpMessage('Request interrupted, Please try again!');
        } else if (knownError.response && knownError.response.status === 401) {
          setPopUpMessage('Email Address does not exist.');
        } else if (knownError.request) {
          setPopUpMessage(
            'Network Error: Please check your internet connection and try again!',
          );
        } else {
          setPopUpMessage('Error processing request, Please try again!');
        }
        setShowPopUp(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
          <Image source={emailIcon} style={styles.input_icons} />
          <TextInput
            style={styles.input}
            placeholder="Email Id"
            placeholderTextColor="#BCBCBC"
            value={email}
            onChangeText={setEmail}
            inputMode="email"
            ref={refEmail}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setIsForgotPassword(false)}
            activeOpacity={0.5}
            hitSlop={20}>
            <Text style={styles.backButton}>Return To Login Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    width: '90%',
    height: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input_icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    margin: 8,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 50,
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
    left: 20,
    zIndex: 2,
  },
  backButton: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgotPassword;
