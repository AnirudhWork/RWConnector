export interface IProps {
  label: string;
  data: Array<{label: string; value: string}>;
  onSelect: (item: {label: string; value: string}) => void;
}

export type CustomMessagePopupProps = {
  message: string;
  visible: boolean;
  setShowPopUp: (value: boolean) => void;
  setPopUpMessage: (value: string) => void;
};