import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

export type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export type CustomHeaderProps = {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
};