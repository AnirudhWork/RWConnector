import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  LoginBackground: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  DrawerNavigationContainer: undefined;
  CustomDrawer: undefined;
};

export type RootDrawerParamList = {
  Jobs: undefined;
};

export type TJobsProps = DrawerNavigationProp<RootDrawerParamList, 'Jobs'>;

export type LoginProps = {
  navigation: NavigationProp<any, any>;
};

export type LoginBackgroundProps = {
  navigation: NavigationProp<any, any>;
  setIsForgotPassword: (value: boolean) => void;
};

export type ForgotPasswordProps = {
  setIsForgotPassword: (value: boolean) => void;
  setSubmitted: (value: boolean) => void;
};

export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export type MainProps = NativeStackScreenProps<
  RootStackParamList,
  'DrawerNavigationContainer'
>;

export type DrawerNavigationContainerProps = NativeStackScreenProps<
  RootStackParamList,
  'DrawerNavigationContainer'
>;

export type CustomHeaderProps = {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
};

export type TDropDownDataProps = {
  label: string;
  value: string;
};

export interface ITruckProps {
  id: number;
  name: string;
  note: string;
}

export interface IJobsProps {
  id: number;
  'bol-num': number;
  'truck-id': number;
  'job-name': string;
  'job-type': number;
  'job-date': number;
  'job-end-date': number;
  'job-addr': string;
  'job-addr2': string;
  'job-city': string;
  'job-state': string;
  'job-zip': string;
  'job-notes': string;
  'job-locked': number;
}
