import React, {useRef, useState} from 'react';
// import {HeaderWithBack} from '../login/Header';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {globalColors} from '../../../Utils/global-colors';
import {globalStyles} from '../../../utils/global-styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  TAddItemDetails,
  // EADD_ITEM_DETAILS,
  // TAddItemDetails,
  TJobDetails_ItemDetails,
  TSAddItemDetails_Route,
  // TSAddItemDetails_Route,
} from './types';
// import {Footer} from '../signature/SignatureCapture';
import {TextInputWithLabel} from '../../../Components/CustomTextInput';
import {SimpleAlert} from '../../../utils/SimpleAlert';
import {printLogs} from '../../../utils/log-utils';
// import {AppSettings} from '../../utils/app-level-settings';

export const AddItemDetails: React.FC<TAddItemDetails> = ({navigation}) => {
  const TAG = AddItemDetails.name;
  const commonSpace: number = 10;
  const route = useRoute<RouteProp<TSAddItemDetails_Route>>();
  const editableOneInfo: TJobDetails_ItemDetails | undefined =
    route.params.editableOne;

  // creating variables for editable one if existing
  let initialDescr = `${editableOneInfo?.['ship-desc'] || ''}`;
  let initialWidth = `${editableOneInfo?.['ship-width'] || ''}`;
  let initialHeight = `${editableOneInfo?.['ship-height'] || ''}`;
  let initialLength = `${editableOneInfo?.['ship-length'] || ''}`;
  let initialQuantity = `${editableOneInfo?.['ship-qty'] || ''}`;

  const [description, setDescription] = useState<string>(initialDescr);
  const [width, setWidth] = useState<string>(initialWidth);
  const [height, setHeight] = useState<string>(initialHeight);
  const [length, setLength] = useState<string>(initialLength);
  const [quantity, setQuantity] = useState<string>(initialQuantity);

  const refTI_Descr = useRef<TextInput>(null);
  const refTI_Length = useRef<TextInput>(null);
  const refTI_Quantity = useRef<TextInput>(null);
  const refTI_Width = useRef<TextInput>(null);
  const refTI_Height = useRef<TextInput>(null);

  const validateAndThenSave = () => {
    let tDescription = description.trim();
    let tWidth = width.trim();
    let tHeight = height.trim();
    let tQuantity = quantity.trim();
    let tLength = length.trim();

    printLogs(
      TAG,
      '| validateAndThenSave() | ',
      description,
      width,
      height,
      quantity,
      length,
    );
    if (tDescription && tWidth && tHeight && tQuantity && tLength) {
      if (
        Number(width) > 0 &&
        Number(height) > 0 &&
        Number(length) > 0 &&
        Number(quantity) > 0
      ) {
        route.params.callback({
          'ship-desc': tDescription,
          'ship-qty': Number(tQuantity),
          'ship-length': Number(tLength),
          'ship-width': Number(tWidth),
          'ship-height': Number(tHeight),
          isThisForSaving: true,
          id: editableOneInfo?.id || 0,
          index: editableOneInfo?.index,
        });
        goBack();
      } else {
        SimpleAlert('', EADD_ITEM_DETAILS.ERR_VALIDATION_MUST_BE_THAN_ZERO);
      }
    } else {
      SimpleAlert('', EADD_ITEM_DETAILS.ERR_VALIDATION_FAILED);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.mainLayout}>
      <HeaderWithBack
        onBackButtonPressed={() => {
          goBack();
        }}
      />

      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={{flex: 1, padding: commonSpace}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: commonSpace,
        }}>
        <Text style={[globalStyles.fontStyleBoldLarge]}>ADD ITEM DETAILS</Text>

        {/* Description */}
        <TextInputWithLabel
          reference={refTI_Descr}
          numberOfLines={1}
          style={{marginTop: commonSpace / 2, width: '100%'}}
          label={'Description'}
          textInputProps={{
            // multiline: true,
            returnKeyType: 'next',
            blurOnSubmit: true,
            defaultValue: initialDescr,
            textAlignVertical: 'top',
            maxLength: AppSettings.CHAR_LIMIT_ITEM_DESCR,
          }}
          placeholder={''}
          onChangeText={setDescription}
          onSubmitEditing={() => {
            refTI_Quantity.current?.focus();
          }}
        />
        {/* Quantity & Length */}
        <View style={{flexDirection: 'row', marginTop: commonSpace / 2}}>
          <TextInputWithLabel
            numberOfLines={1}
            reference={refTI_Quantity}
            style={{flex: 1}}
            label={'Quantity'}
            textInputProps={{
              keyboardType: 'decimal-pad',
              returnKeyType: 'next',
              defaultValue: initialQuantity,
              maxLength: AppSettings.CHAR_LIMIT_ITEM_NUMBER_FIELDS,
            }}
            placeholder={''}
            onChangeText={setQuantity}
            onSubmitEditing={() => {
              refTI_Length.current?.focus();
            }}
          />
          <TextInputWithLabel
            reference={refTI_Length}
            numberOfLines={1}
            style={{flex: 1, marginLeft: commonSpace}}
            label={'Length'}
            textInputProps={{
              keyboardType: 'decimal-pad',
              returnKeyType: 'next',
              defaultValue: initialLength,
              maxLength: AppSettings.CHAR_LIMIT_ITEM_NUMBER_FIELDS,
            }}
            placeholder={''}
            onChangeText={setLength}
            onSubmitEditing={() => {
              refTI_Width.current?.focus();
            }}
          />
        </View>

        {/* WIDTH & HEIGHT */}
        <View style={{flexDirection: 'row', marginTop: commonSpace / 2}}>
          <TextInputWithLabel
            numberOfLines={1}
            reference={refTI_Width}
            style={{flex: 1}}
            label={'Width'}
            textInputProps={{
              keyboardType: 'decimal-pad',
              returnKeyType: 'next',
              defaultValue: initialWidth,
              maxLength: AppSettings.CHAR_LIMIT_ITEM_NUMBER_FIELDS,
            }}
            placeholder={''}
            onChangeText={setWidth}
            onSubmitEditing={() => {
              refTI_Height.current?.focus();
            }}
          />
          <TextInputWithLabel
            numberOfLines={1}
            reference={refTI_Height}
            style={{flex: 1, marginLeft: commonSpace}}
            label={'Height'}
            textInputProps={{
              keyboardType: 'decimal-pad',
              returnKeyType: 'done',
              defaultValue: initialHeight,
              maxLength: AppSettings.CHAR_LIMIT_ITEM_NUMBER_FIELDS,
            }}
            placeholder={''}
            onChangeText={setHeight}
            onSubmitEditing={() => {
              validateAndThenSave();
            }}
          />
        </View>
      </ScrollView>

      {Footer(
        'CANCEL',
        'SAVE',
        () => {
          goBack();
        },
        () => {
          validateAndThenSave();
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: globalColors.white,
    flex: 1,
  },
  drawerContainer: {flex: 1},
  footerMain: {
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: globalColors.white,
  },
  footerSub: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  tabComponentContainer: {flex: 1},
  buttonCommonPadding: {paddingLeft: 20, paddingRight: 20},
  labelText: {textAlign: 'center'},
  rightButtonLeftMargin: {marginLeft: 20},
});
