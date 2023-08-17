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
  onClearMessage?: () => void;
  setConfirmLogOut?: [null | boolean, Dispatch<SetStateAction<boolean>>];
};

export type LoadingProps = {
  visible: boolean;
};

export type AuthContextType = {
  data: null | string;
  setData: Dispatch<SetStateAction<null | string>>;
} | null;
