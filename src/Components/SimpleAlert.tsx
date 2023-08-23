import {Alert} from 'react-native';

export const SimpleAlert = (title: string, message: string) => {
  Alert.alert(title, message);
};

export const AlertWithOneActionableOption = (
  title: string,
  message: string,
  positiveName: string,
  cancellable: boolean,
  callback: (executeAction: boolean) => void,
) => {
  let buttons = [
    {
      text: positiveName,
      onPress: () => {
        callback(true);
      },
    },
  ];

  Alert.alert(title, message, buttons, {
    cancelable: cancellable,
  });
};

export const AlertWithTwoActionableOptions = (
  title: string,
  message: string,
  positiveName: string,
  negativeName: string | null,
  cancellable: boolean,
  callback: (executeAction: boolean) => void,
) => {
  let buttons = [
    {
      text: positiveName,
      onPress: () => {
        callback(true);
      },
    },
  ];

  if (negativeName) {
    buttons.push({
      text: negativeName,
      onPress: () => {
        callback(false);
      },
    });
  }

  Alert.alert(title, message, buttons, {
    cancelable: cancellable,
  });
};
