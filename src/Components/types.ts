import {Dispatch, SetStateAction} from 'react';
import {ITruckProps} from '../screens/types';

export interface IProps {
  label: string;
  data: Array<ITruckProps>;
  onSelect: (item: ITruckProps) => void;
}

export type CustomMessagePopupProps = {
  message: string;
  visible: boolean;
  setShowPopUp: (value: boolean) => void;
  setPopUpMessage: (value: string) => void;
};

export type LoadingProps = {
  visible: boolean;
};

export type AuthContextType = {
  userToken: null | string;
  setUserToken: Dispatch<SetStateAction<null | string>>;
} | null;
