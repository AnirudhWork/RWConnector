import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  DrawerNavigationContainer: undefined;
};

export type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export type MainProps = NativeStackScreenProps<RootStackParamList, 'DrawerNavigationContainer'>;

export type CustomHeaderProps = {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
};

export type TDropDownDataProps = {
  label: string;
  value: string;
};