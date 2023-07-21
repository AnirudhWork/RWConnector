import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

export type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SplashProps = NativeStackScreenProps <RootStackParamList, 'Splash'>;
