import {ITruckProps} from '../screens/types';

export interface IProps {
  label: string;
  data: Array<ITruckProps>;
  onSelect: (item: ITruckProps) => void;
}

export interface UserData {
  username: string | null;
  appVersion: string | null;
}
