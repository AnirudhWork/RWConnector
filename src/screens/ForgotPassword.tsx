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
// import axios from 'axios';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  navigation,
  setIsForgotPassword,
  setSubmitted,
}) => {
  const emailIcon = require('../Icons/EmailLogo.png');

  const [email, setEmail] = useState('');
  const refEmail = useRef<TextInput>(null);

  const keyboardDidHideCallback = () => {
    refEmail.current?.blur();
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

  const handleSubmit = () => {
    // const url = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg/auth/login';
    // axios.post(url).then(res => console.log(res.data)).catch(err => console.log("There was an error fetching data", err));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsForgotPassword(false); // display Login screen again
    }, 2000);
  };

  return (
    <View style={styles.container}>
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
            activeOpacity={0.5}>
            <Text style={{color: 'white'}}>Return To Login Screen</Text>
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
    height: '90%',
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
  showPassword: {
    position: 'absolute',
    right: 20,
  },
});

export default ForgotPassword;
