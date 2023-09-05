import { Dispatch, SetStateAction } from 'react';
import { ITruckProps } from '../screens/types';
import { DrawerNavigationHelpers, DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';

export interface IProps {
  label: string;
  data: Array<ITruckProps>;
  onSelect: ( item: ITruckProps ) => void;
}

export type LoadingProps = {
  visible: boolean;
};

export interface UserData {
  username: string | null;
  appVersion: string | null;
}

export type AuthContextType = {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
} | null;

export type CustomDrawerNavigationProps = {
  navigation: DrawerNavigationProp<any, any>,
}