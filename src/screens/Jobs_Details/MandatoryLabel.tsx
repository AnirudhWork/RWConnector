import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../Utils/global-styles';
import {globalColors} from '../../Utils/global-colors';

export const MandatoryLabel: React.FC<{label: string}> = ({label}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[globalStyles.fontStyleRegular, {color: globalColors.label}]}>
        {label}
      </Text>
      <Text style={[globalStyles.fontStyleRegular, {color: 'red'}]}> *</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
