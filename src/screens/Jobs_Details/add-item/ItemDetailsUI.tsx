import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useImperativeHandle, useState} from 'react';
import {
  TItemDetailsUI,
  TJobDetails_ItemDetails,
  TRef_ItemDetailsUI,
} from './types';
import {printLogs} from '../../../Utils/log-utils';
import {SCREEN_NAMES} from '../../../Navigators/constants';
import {MandatoryLabel} from '../MandatoryLabel';
import {JOB_DETAILS_LABEL} from '../job-details-constants';

export const ItemDetailsUI = React.forwardRef<
  TRef_ItemDetailsUI,
  TItemDetailsUI
>(
  (
    {
      navigation,
      commonSpace,
      commonIconSize,
      extraStyles,
      isItCompletedJobType,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => {
      return {
        getItems() {
          return itemDetails;
        },
        setItems(items) {
          setItemDetails(items);
        },
      };
    });
    const TAG = ItemDetailsUI.name;

    // <-- useState Declaration -->
    const [itemDetails, setItemDetails] = useState<TJobDetails_ItemDetails[]>(
      [],
    );

    const navigateToAddDetailsScreen = (
      editableDataSet?: TJobDetails_ItemDetails,
    ) => {
      let routeInfo = {
        editableDataSet: editableDataSet,
        addNewDataSet(newDataSet: TJobDetails_ItemDetails) {
          printLogs(
            TAG,
            '| navigateToAddDetailsScreen() | addNewDataSet() | IJobDetails_ItemDetails | newDataSet.index =',
            newDataSet.index,
          );
          //checking if we need to update an item or add a new one
          if (newDataSet?.index != undefined) {
            const newList = itemDetails.map((item, index) => {
              // (using index) checking for the item that needs to be updated and replacing it with new item
              if (index === newDataSet.index) {
                return newDataSet;
              }
              // for all other cases returning the same item
              return item;
            });
            // finally storing the new list of items
            setItemDetails(newList);
          } else {
            // spreading the old list of items and adding a new item to the list
            setItemDetails([...itemDetails, newDataSet]);
          }
        },
      };
      printLogs(
        TAG,
        '| navigateToAddDetailsScreen() ==> routeInfo =',
        routeInfo,
      );

      navigation.navigate(SCREEN_NAMES.NEW_ITEM_DETAILS, routeInfo);
    };
    // <-- Activity -->
    return (
      <View style={[styles.container, extraStyles]}>
        <View style={[styles.content, {marginBottom: commonSpace}]}>
          <MandatoryLabel label={JOB_DETAILS_LABEL.ITEM_DETAILS} />
          {!isItCompletedJobType && (
            <TouchableOpacity
              onPress={() => {
                navigateToAddDetailsScreen();
              }}>
              <Image
                source={require('../../../Assets/Icons/ic_plus.png')}
                resizeMode={'contain'}
                style={{width: commonIconSize, height: commonIconSize}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

// <-- Styles -->
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ItemDetailsUI;
