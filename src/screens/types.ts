import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

export type ForgotPasswordProp = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
export type LoginProp = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SplashProp = NativeStackScreenProps <RootStackParamList, 'Splash'>;
