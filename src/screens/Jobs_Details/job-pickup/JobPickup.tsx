import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IJobPickupDetailsProps, ITruckProps } from '../../types';
import { globalColors } from '../../../Utils/global-colors';
import {
  JOB_DETAILS_LABEL,
  JOB_DETAILS_NOTE,
  ValidateAndReturnEmpty,
  ValidateAndReturnNA,
} from '../job-details-constants';
import { globalStyles } from '../../../Utils/global-styles';
import moment, { unix } from 'moment';
import truckInfo from '../TruckInfo';
import InfoFields from '../InfoFields';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { DriverNote } from '../DriverNote';
import { isTablet } from 'react-native-device-info';
import { useGlobalContext } from '../../../Components/GlobalContext';

const JobPickup: React.FC<IJobPickupDetailsProps> = ( { navigation } ) => {

  const isThisTablet = isTablet();

  // <-- Redux -->
  const _dispatch = useAppDispatch();
  const jobDetailsData = useAppSelector( state => state.jobDetails.jobDetails );
  const selectedTruck: ITruckProps = useAppSelector(
    state => state.truck.selectedTruck,
  );

  // <-- useState & variable declarations -->
  const [endDate, setEndDate] = useState<string>();
  const deliveryDate = jobDetailsData?.['del-date'];
  const [refDriverNote, setRefDriverNote] = useState();
  const [config_IsItCompleted, setConfig_IsItCompleted] = useState<boolean>( false );
  const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>( false );

  // <-- Global Context -->
  const globalContext = useGlobalContext();

  let commonSpace = globalContext.commonSpace;
  let commonMiniSpace = globalContext.commonMiniSpace;


  // <-- useEffects -->
  useEffect( () => {
    setEndDate(
      deliveryDate ? moment( unix( deliveryDate ) ).format( 'DD-MMM-YYYY' ) : '',
    );
  }, [] );

  // <-- Activity -->
  return (
    <View style={[styles.container, { backgroundColor: globalColors.white }]}>
      {jobDetailsData && (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.date}>
            <Text
              style={[{ textAlign: 'center' }, globalStyles.fontStyleBoldLarge]}>
              {jobDetailsData['bol-num']}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  { color: globalColors.JOB_DETAILS_DATE },
                  globalStyles.fontSizeNormal,
                ]}>
                {endDate}
              </Text>
              <Text
                style={[
                  {
                    flex: 1,
                    textAlign: 'right',
                    color: globalColors.JOB_DETAILS_DATE,
                  },
                  globalStyles.fontSizeNormal,
                ]}>
                {JOB_DETAILS_NOTE.FIXED}
              </Text>
            </View>
          </View>

          {truckInfo(
            JOB_DETAILS_LABEL.TRUCK_DETAILS,
            ValidateAndReturnEmpty( selectedTruck.name ),
            ValidateAndReturnEmpty( selectedTruck.note ),
            {
              backgroundColor: globalColors.JOB_DETAIL_BG_1,
              ...globalStyles.commonPadding,
            },
          )}
          <View style={styles.puInfo}>
            {InfoFields(
              JOB_DETAILS_LABEL.PICKUP_DETAILS,
              ValidateAndReturnNA( jobDetailsData['pu-name'] ),
              ValidateAndReturnEmpty( jobDetailsData['pu-addr'] ),
              `${ValidateAndReturnEmpty( jobDetailsData['pu-city'] )}, ${jobDetailsData['pu-state']
              } ${jobDetailsData['pu-zip']}`,
              {
                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                ...globalStyles.commonPadding,
              },
            )}
            {InfoFields(
              JOB_DETAILS_LABEL.CONTACT_DETAILS,
              ValidateAndReturnNA( jobDetailsData['pu-name'] ),
              `Tel: ${ValidateAndReturnEmpty( jobDetailsData['pu-phone'] )}`,
              `Email: ${ValidateAndReturnEmpty( jobDetailsData['pu-email'] )}`,
              {
                backgroundColor: globalColors.JOB_DETAIL_BG_1,
                marginTop: 3,
                ...globalStyles.commonPadding,
              },
            )}
          </View>
          <View style={styles.puInfo}>
            {InfoFields(
              JOB_DETAILS_LABEL.BILL_DETAILS,
              ValidateAndReturnNA( jobDetailsData['pu-name'] ),
              ValidateAndReturnEmpty( jobDetailsData['pu-addr'] ),
              `${ValidateAndReturnEmpty( jobDetailsData['pu-city'] )}, ${jobDetailsData['pu-state']
              } ${jobDetailsData['pu-zip']}`,
              {
                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                padding: commonSpace,
              },
            )};
            {/* <DriverNote
              ref={refDriverNote}
              commonSpace={commonSpace}
              isItCompletedJobType={config_IsItCompleted}
              title={JOB_DETAILS_LABEL.DRIVER_NOTE}
              enabled={isEditingEnabled}
              extraStyle={{
                ...globalStyles.commonPadding,
                backgroundColor: globalColors.JOB_DETAIL_BG_1,
                padding: commonSpace,
                marginLeft: isThisTablet ? commonMiniSpace : 0,
                marginTop: isThisTablet ? 0 : commonMiniSpace,
              }}
            /> */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// <-- Styles -->
const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  date: {
    backgroundColor: 'transparent',
    padding: 15,
  },
  puInfo: {
    flexDirection: 'column',
    marginTop: 3,
  },
} );

export default JobPickup;