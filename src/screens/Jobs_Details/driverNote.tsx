import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useImperativeHandle, useState } from 'react';
import { printLogs } from '../../Utils/log-utils';
import { globalStyles } from '../../Utils/global-styles';
import { globalColors } from '../../Utils/global-colors';
import { TextInput } from 'react-native-gesture-handler';
import { ValidateAndReturnNA } from './job-details-constants';

export type TDriverNote = {
  isItCompletedJobType: boolean;
  title: string;
  enabled: boolean;
  commonSpace: number;
  extraStyle: ViewStyle;
};

export type TRef_DriverNote = {
  getNote: () => string;
  setNote: ( rwNote: string, driverNote: string ) => void;
};

export const DriverNote = React.forwardRef<TRef_DriverNote, TDriverNote>(
  ( { enabled, extraStyle, commonSpace, title, isItCompletedJobType }, ref ) => {
    const TAG = DriverNote.name;

    const [driverNote, setDriverNote] = useState( '' );
    const [defaultNotesFromRW, setDefaultNotesFromRW] = useState( '' );
    const [default_driverNote, set_default_driverNote] = useState( '' );

    useImperativeHandle( ref, () => {
      return {
        getNote() {
          return driverNote;
        },
        setNote( rwNote: string, driverNote: string ) {
          printLogs(
            TAG,
            'useImperativeHandle()-setNote() |',
            rwNote,
            driverNote,
          );
          set_default_driverNote( driverNote );
          setDriverNote( driverNote );
          setDefaultNotesFromRW( rwNote );
        },
      };
    } );

    return (
      <View style={[
        styles.container,
        extraStyle
      ]}>
        <Text style={[
          globalStyles.fontStyleRegular,
          {
            color: globalColors.PLACEHOLDER,
          }
        ]}>
          {title}
        </Text>

        {isItCompletedJobType || enabled ? (
          <>
            {defaultNotesFromRW && (
              <Text style={{
                backgroundColor: globalColors.TRANSPARENT,
                borderRadius: commonSpace / 2,
                marginTop: commonSpace / 2,
                color: globalColors.black,
              }}>
                {defaultNotesFromRW}
              </Text>
            )}
            <TextInput
              style={{
                marginTop: commonSpace / 2,
                padding: commonSpace,
                backgroundColor: isItCompletedJobType || enabled
                  ? globalColors.white
                  : globalColors.TRANSPARENT,
                borderRadius: 3,
                textAlignVertical: 'top',
                color: isItCompletedJobType
                  ? globalColors.PLACEHOLDER
                  : globalColors.black,
              }}
              defaultValue={default_driverNote}
              editable={!isItCompletedJobType}
              multiline={true}
              numberOfLines={2}
              maxLength={100}
              onChangeText={setDriverNote}
              placeholderTextColor={globalColors.PLACEHOLDER}
            />
          </>
        ) : (
          <Text style={{
            marginTop: enabled ? commonSpace : 0,
            backgroundColor: globalColors.TRANSPARENT,
            borderRadius: commonSpace / 2,
            color: globalColors.black,
          }}>
            {ValidateAndReturnNA( defaultNotesFromRW )}
          </Text>
        )}
      </View>
    );
  },
);


const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
} );
