import {TextInputProps, ViewStyle} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {LegacyRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';

export type TRef_ItemDetailsUI = {
  getItems: () => TJobDetails_ItemDetails[];
  setItems: (items: TJobDetails_ItemDetails[]) => void;
};

export type TJobDetails_ItemDetails = {
  'ship-qty': number;
  'ship-desc': string;
  'ship-length': number;
  'ship-width': number;
  'ship-height': number;
  isThisForSaving?: boolean;
  id: number;
  index?: number;
};

export type TItemDetailsUI = {
  isItCompletedJobType: boolean;
  commonSpace: number;
  commonIconSize: number;
  extraStyles: ViewStyle;
  navigation: DrawerNavigationProp<any, any>;
};

export type TItemDetailsProps = {
  isItCompletedJobType: boolean;
  commonSpace: number;
  items: TJobDetails_ItemDetails[];
  editExistingItem: (item: TJobDetails_ItemDetails) => void;
};

export type TTextInputWithLabel = {
  reference?: LegacyRef<TextInput>;
  style?: ViewStyle;
  textInputProps?: TextInputProps;
  label: string;
  placeholder: string;
  numberOfLines: number;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
};

export type TAddItemDetails = {
  navigation: DrawerNavigationProp<any, any>;
};

export type TSAddItemDetails_Route = {
  params: {
    editableOne: TJobDetails_ItemDetails | undefined;
    callback: (info: TJobDetails_ItemDetails) => void;
  };
};
