import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TItemDetailsProps, TJobDetails_ItemDetails} from './types';
import {globalColors} from '../../../Utils/global-colors';
import {globalStyles} from '../../../Utils/global-styles';
import {ITEM_ERROR_MSGS, NEW_ITEM_TITLES} from '../job-details-constants';

export const ItemDetails: React.FC<TItemDetailsProps> = ({
  commonSpace,
  editExistingItem,
  isItCompletedJobType,
  items,
}) => {
  return items.length > 0 ? (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: globalColors.LIGHT_GRAY,
      }}>
      {commonUIItemDetails(
        NEW_ITEM_TITLES.DESCR,
        NEW_ITEM_TITLES.QTY,
        NEW_ITEM_TITLES.LENGTH,
        NEW_ITEM_TITLES.WIDTH,
        NEW_ITEM_TITLES.HEIGHT,
        {...styles.flatlistHeader, paddingLeft: commonSpace},
      )}
      {items.map((item, index) => {
        let withIndex: TJobDetails_ItemDetails = {
          'ship-desc': item['ship-desc'],
          'ship-height': item['ship-height'],
          'ship-length': item['ship-length'],
          'ship-qty': item['ship-qty'],
          'ship-width': item['ship-width'],
          id: item.id,
          index: index,
        };
        return (
          <TouchableOpacity
            disabled={isItCompletedJobType}
            onPress={() => {
              editExistingItem(withIndex);
            }}
            key={item.id}>
            <ItemDetailView commonSpace={commonSpace} item={withIndex} />
          </TouchableOpacity>
        );
      })}
    </View>
  ) : (
    <Text
      style={[
        globalStyles.fontStyleRegular,
        {
          textAlign: 'center',
          justifyContent: 'center',
          textAlignVertical: 'center',
          color: globalColors.label,
        },
      ]}>
      {ITEM_ERROR_MSGS.NO_ITEMS}
    </Text>
  );
};

const ItemDetailView: React.FC<{
  commonSpace: number;
  item: TJobDetails_ItemDetails;
}> = ({commonSpace, item}) => {
  return commonUIItemDetails(
    item['ship-desc'],
    item['ship-qty'],
    item['ship-length'],
    item['ship-width'],
    item['ship-height'],
    {paddingLeft: commonSpace},
  );
};

const commonUIItemDetails = (
  text1: any,
  text2: any,
  text3: any,
  text4: any,
  text5: any,
  style: TextStyle,
) => {
  let reqStyle = style ? style : styles.textStyle;
  return (
    <View style={{flexDirection: 'row', width: '100%'}}>
      <Text
        style={[styles.mainStyle, {flex: 2}, reqStyle, {textAlign: 'left'}]}>
        {text1}
      </Text>
      <Text style={[styles.mainStyle, reqStyle]}>{text2}</Text>
      <Text style={[styles.mainStyle, reqStyle]}>{text3}</Text>
      <Text style={[styles.mainStyle, reqStyle]}>{text4}</Text>
      <Text style={[styles.mainStyle, reqStyle]}>{text5}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    ...globalStyles.fontStyleRegular,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  mainStyle: {
    flex: 1,
    borderColor: globalColors.LIGHT_GRAY,
    borderWidth: 0.5,
    padding: 2,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  flatlistHeader: {
    ...globalStyles.fontStyleSmall,
    backgroundColor: globalColors.ITEM_DETAILS_HEADER_BG,
  },
});
