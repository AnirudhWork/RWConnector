import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { DRAWER_SCREEN_NAMES } from '../Navigators/constants';

export type RootStackParamList = {
  Splash: undefined;
  LoginBackground: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  DrawerNavigationContainer: undefined;
  CustomDrawer: undefined;
};

export type RootDrawerParamList = {
  TruckList: undefined;
  JobDetails: { jobId: number, jobType: number };
};

export type TTruckListProps = {
  navigation: DrawerNavigationProp<any, any>,
}

export type TJobsListProps = {
  navigation: DrawerNavigationProp<any, any>;
  jobsData: IJobsProps[] | null,
}

export type TJobsDetailsProps = {
  navigation: DrawerNavigationProp<any, any>,
  route: RouteProp<RootDrawerParamList, DRAWER_SCREEN_NAMES.JOB_DETAILS>,
}

export type LoginProps = {
  navigation: DrawerNavigationProp<any, any>;
};

export type LoginBackgroundProps = {
  navigation: DrawerNavigationProp<any, any>;
  setIsForgotPassword: ( value: boolean ) => void;
};

export type ForgotPasswordProps = {
  navigation: DrawerNavigationProp<any, any>;
  setIsForgotPassword: ( value: boolean ) => void;
  setSubmitted: ( value: boolean ) => void;
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

export interface IJobDeliveryDetailsProps {
  jobDetailsData: IJobDetailsProps | undefined
}

export interface IJobPickupDetailsProps {
  jobDetailsData: IJobDetailsProps | undefined
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

export interface ILoginDataProps {
  uname: string,
  token: string,
  'expire-time': number,
  'update-app-ver': number,
  'latest-app-ver': string,
}

export interface IJobDetailsProps {
  id: number,
  'bol-num': number,
  'truck-id': number,
  'pu-date': number,
  'pu-name': string,
  'pu-addr': string,
  'pu-addr2': string,
  'pu-city': string,
  'pu-state': string,
  'pu-zip': string,
  'pu-contact': string
  'pu-phone': number,
  'pu-email': string,
  'pu-terms': string,
  'pu-dec-val': number,
  'pu-note': string,
  'del-date': number,
  'del-name': string,
  'del-addr': string,
  'del-addr2': string,
  'del-city': string,
  'del-state': string,
  'del-zip': string,
  'del-contact': string,
  'del-phone': number,
  'del-email': string,
  'del-note': string,
  'cust-name': string,
  'cust-addr': string,
  'cust-addr2': string,
  'cust-city': string,
  'cust-state': string,
  'cust-zip': string,
  'spec-instr': string,
  items:
  [
    {
      'ship-qty': number,
      'ship-desc': string,
      'ship-length': number,
      'ship-width': number,
      'ship-height': number,
    }
  ]
}