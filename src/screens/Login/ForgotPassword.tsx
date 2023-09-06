import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';

import { ForgotPasswordProps } from '../types';
import axios from 'axios';
import { SimpleAlert } from '../../Utils/SimpleAlert';
import Loading from '../../Components/Loading';
import { LOGIN_ERROR_ALERTS } from './constants';
import {
  API_ENDPOINT,
  API_ERR_MSG,
  IsInternetAccessAvailable,
  STATUS_CODES,
  commonHeaders,
} from '../../Api/constants';
import { APIServices } from '../../Api/api-services';
import { printLogs } from '../../Utils/log-utils';

const ForgotPassword: React.FC<ForgotPasswordProps> = ( {
  navigation,
  setIsForgotPassword,
  setSubmitted,
} ) => {
  const emailIcon = require( '../../Assets/Icons/EmailLogo.png' );

  const [email, setEmail] = useState( '' );
  const [isLoading, setIsLoading] = useState( false );

  const refEmail = useRef<TextInput>( null );

  // useEffect(() => {
  //   const keyboardDidHideSubscription = Keyboard.addListener(
  //     'keyboardDidHide',
  //     keyboardDidHideCallback,
  //   );

  //   return () => {
  //     keyboardDidHideSubscription?.remove();
  //   };
  // }, []);

  // const keyboardDidHideCallback = () => {
  //   refEmail.current?.blur();
  // };

  const isValidEmail = ( email: string ) => {
    // Regular expression for basic email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return emailRegex.test( email );
  };

  // <-- Apis -->

  const handlePwReset = async () => {
    const TAG = handlePwReset.name;
    if ( !email.trim() ) {
      SimpleAlert( '', LOGIN_ERROR_ALERTS.EMPTY_FIELDS );
    } else if ( !isValidEmail( email ) ) {
      SimpleAlert( '', LOGIN_ERROR_ALERTS.INVALID_EMAIL );
    } else {
      setIsLoading( true );
      try {
        const data = {
          email: email,
        };
        const response = await new APIServices( false, navigation ).post(
          API_ENDPOINT.FORGOT_PW,
          data,
          commonHeaders,
        );
        if ( response?.status === STATUS_CODES.SUCCESS ) {
          printLogs(
            TAG,
            '| successfully sent reset password to email id:',
            response,
          );
          setSubmitted( true );
          setTimeout( () => {
            setSubmitted( false );
            setIsForgotPassword( false );
          }, 2000 );
        }
      } catch ( error ) {
        const knownError = error as any;
        if ( axios.isCancel( error ) ) {
          SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
        } else if ( IsInternetAccessAvailable( knownError.response?.status ) && knownError.response?.status === STATUS_CODES.UNAUTHORIZED ) {
          SimpleAlert( '', LOGIN_ERROR_ALERTS.FORGOT_PW_ERR );
        } else {
          printLogs( TAG, '| Forgot Pw error:', error );
          SimpleAlert( '', API_ERR_MSG.ERR );
        }
      } finally {
        setIsLoading( false );
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading visible={isLoading} />}
      <View style={styles.input_container}>
        <View style={{ alignItems: 'center', width: '100%' }}>
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
              onSubmitEditing={handlePwReset}
            />
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity onPress={handlePwReset}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={() => setIsForgotPassword( false )}
            activeOpacity={0.5}
            hitSlop={20}>
            <Text style={styles.backButton}>Return To Login Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    width: '80%',
    height: '70%',
    justifyContent: 'space-between',
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonContainer: {
    width: '100%',
    marginTop: 10,
  },
  submitButtonText: {
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    fontSize: 14,
  },
} );

export default ForgotPassword;
