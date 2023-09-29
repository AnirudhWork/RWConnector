import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {TTextInputWithLabel} from '../screens/Jobs_Details/add-item/types';
import {GlobalContext} from './GlobalContext';
import {TextInput} from 'react-native-gesture-handler';
import {globalColors} from '../Utils/global-colors';
import {globalStyles} from '../Utils/global-styles';

export const TextInputWithLabel: React.FC<TTextInputWithLabel> = ({
  reference,
  style,
  placeholder,
  label,
  textInputProps,
  numberOfLines,
  onChangeText,
  onSubmitEditing,
}) => {
  const {globalHeight} = useContext(GlobalContext);
  return (
    <View style={[style, {flexDirection: 'column'}]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={globalStyles.fontStyleRegular}>{label}</Text>
        <Text style={[globalStyles.fontStyleRegular, {color: 'red'}]}> *</Text>
      </View>
      <TextInput
        ref={reference}
        style={[
          {
            paddingLeft: 10,
            paddingRight: 10,
            borderWidth: 1,
            borderRadius: 2,
            borderColor: globalColors.LIGHT_GRAY,
            backgroundColor: globalColors.white,
            color: globalColors.black,
            minHeight: numberOfLines == 1 ? globalHeight : numberOfLines * 20,
          },
        ]}
        {...textInputProps}
        numberOfLines={numberOfLines}
        scrollEnabled={true}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={globalColors.PLACEHOLDER}
      />
    </View>
  );
};
