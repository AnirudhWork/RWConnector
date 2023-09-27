import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import {IJobPickupDetailsProps, ITruckProps} from '../../types';
import {globalColors} from '../../../Utils/global-colors';
import {
  IS_JOB_LOCKED_BY_CURRENT_USER,
  JOB_DETAILS_JOB_TYPE,
  JOB_DETAILS_LABEL,
  JOB_DETAILS_NOTE,
  ValidateAndReturnEmpty,
  ValidateWithCommaAndReturnEmpty,
} from '../job-details-constants';
import {globalStyles} from '../../../Utils/global-styles';
import moment, {unix} from 'moment';
import truckInfo from '../TruckInfo';
import InfoFields from '../InfoFields';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {DriverNote, TRef_DriverNote} from '../DriverNote';
import {isTablet} from 'react-native-device-info';
import {useGlobalContext} from '../../../Components/GlobalContext';
import {JOB_STATUS} from '../../truck_selection/constants';
import {printLogs} from '../../../Utils/log-utils';
import ItemDetailsUI from '../add-item/ItemDetailsUI';
import {TRef_ItemDetailsUI} from '../add-item/types';

const JobPickup: React.FC<IJobPickupDetailsProps> = ({navigation}) => {
  const TAG = JobPickup.name;

  // <-- Redux -->
  const _dispatch = useAppDispatch();
  const jobDetailsData = useAppSelector(state => state.jobDetails.jobDetails);
  const selectedJobInfo = useAppSelector(state => state.truck.selectedJob);
  const selectedTruck: ITruckProps = useAppSelector(
    state => state.truck.selectedTruck,
  );

  // <-- useRef -->
  const refDriverNote = createRef<TRef_DriverNote>();
  const refItemDetails = createRef<TRef_ItemDetailsUI>();

  // <-- variable declarations -->
  const isThisTablet = isTablet();
  const pickupDate = jobDetailsData?.['pu-date'];

  // <-- useState declarations -->
  const [endDate, setEndDate] = useState<string>();
  const [declaredValue, setDeclaredValue] = useState<number>();
  const [config_IsItCompleted, setConfig_IsItCompleted] =
    useState<boolean>(false);
  const [config__IsItLocked, setconfig__IsItLocked] = useState<boolean>(false);
  const [config__IsJobTypePickup, setConfig__IsJobTypePickup] =
    useState<boolean>(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>(false);
  const [isFooterRequired, setIsFooterRequired] = useState<boolean>(false);

  // <-- Global Context -->
  const globalContext = useGlobalContext();

  let commonSpace = globalContext.commonSpace;
  let commonMiniSpace = globalContext.commonMiniSpace;

  // <-- useEffects -->
  useEffect(() => {
    setEndDate(
      pickupDate
        ? moment(unix(pickupDate)).format('DD-MMM-YYYY')
        : JOB_DETAILS_LABEL.EMPTY,
    );
    setDeclaredValue(jobDetailsData?.['pu-dec-val']);
    printLogs(
      TAG,
      '| useEffect() | declaredValue:',
      jobDetailsData?.['pu-dec-val'],
    );
  }, [jobDetailsData]);

  useEffect(() => {
    let jobType = selectedJobInfo?.['job-type'];
    let isLockedUser = selectedJobInfo?.['is-locked-user'];
    let jobStatus = selectedJobInfo?.['job-locked'];

    let isJobTypePickup = jobType == JOB_DETAILS_JOB_TYPE.PICKUP;
    let isJobStatusLocked = jobStatus == JOB_STATUS.LOCKED;
    let isJobStatusCompleted = jobStatus == JOB_STATUS.COMPLETED;
    let isLockedByCurrentUserOnly =
      isLockedUser == IS_JOB_LOCKED_BY_CURRENT_USER.YES;
    let isThisEditable = isJobStatusLocked && isJobTypePickup;

    setconfig__IsItLocked(isJobStatusLocked);
    setConfig_IsItCompleted(
      isJobStatusCompleted ||
        (isLockedByCurrentUserOnly && !isJobTypePickup && isJobStatusLocked)
        ? true
        : false,
    );

    setIsEditingEnabled(
      isLockedByCurrentUserOnly && isJobStatusLocked && isJobTypePickup,
    );

    setConfig__IsJobTypePickup(isJobTypePickup);

    printLogs(
      TAG,
      ' | useEffect() [ selectedJob ] | ',
      '\n| isJobStatusLocked = ',
      isJobStatusLocked,
      '\n| isJobStatusCompleted = ',
      isJobStatusCompleted,
      '\n| isThisEditable = ',
      isThisEditable,
    );
    manageLocallySavedDataOrServerResp();
  }, [selectedJobInfo]);

  const manageLocallySavedDataOrServerResp = async () => {
    if (jobDetailsData) {
      let note = config__IsJobTypePickup ? jobDetailsData?.['job-notes'] : '';
      if (config_IsItCompleted) {
        refDriverNote?.current?.setNote(
          note,
          ValidateAndReturnEmpty(jobDetailsData?.['pu-note']),
        );
        console.log(refDriverNote?.current?.getNote());
      }
    }
  };

  // <-- Activity -->
  return (
    <View style={[styles.container, {backgroundColor: globalColors.white}]}>
      {jobDetailsData && (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.date}>
            <Text
              style={[{textAlign: 'center'}, globalStyles.fontStyleBoldLarge]}>
              {jobDetailsData['bol-num']}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  {color: globalColors.JOB_DETAILS_DATE},
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
            ValidateAndReturnEmpty(selectedTruck.name),
            ValidateAndReturnEmpty(selectedTruck.note),
            {
              backgroundColor: globalColors.JOB_DETAIL_BG_1,
              ...globalStyles.commonPadding,
            },
          )}
          <View style={styles.puInfo}>
            {InfoFields(
              JOB_DETAILS_LABEL.PICKUP_DETAILS,
              ValidateAndReturnEmpty(jobDetailsData['pu-name']),
              ValidateAndReturnEmpty(jobDetailsData['pu-addr']),
              `${ValidateWithCommaAndReturnEmpty(
                jobDetailsData['pu-city'],
              )} ${ValidateAndReturnEmpty(
                jobDetailsData['pu-state'],
              )} ${ValidateAndReturnEmpty(jobDetailsData['pu-zip'])}`,
              {
                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                ...globalStyles.commonPadding,
              },
            )}
            {InfoFields(
              JOB_DETAILS_LABEL.CONTACT_DETAILS,
              ValidateAndReturnEmpty(jobDetailsData['pu-name']),
              `Tel: ${ValidateAndReturnEmpty(jobDetailsData['pu-phone'])}`,
              `Email: ${ValidateAndReturnEmpty(jobDetailsData['pu-email'])}`,
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
              ValidateAndReturnEmpty(jobDetailsData['pu-name']),
              ValidateAndReturnEmpty(jobDetailsData['pu-addr']),
              `${ValidateWithCommaAndReturnEmpty(
                jobDetailsData['pu-city'],
              )} ${ValidateAndReturnEmpty(
                jobDetailsData['pu-state'],
              )} ${ValidateAndReturnEmpty(jobDetailsData['pu-zip'])}`,
              {
                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                padding: commonSpace,
              },
            )}
            <DriverNote
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
            />
          </View>

          {truckInfo(
            JOB_DETAILS_LABEL.SPECIAL_INFO,
            '',
            ValidateAndReturnEmpty(jobDetailsData['spec-instr']),
            {
              backgroundColor: globalColors.JOB_DETAIL_BG_2,
              ...globalStyles.commonPadding,
              marginTop: commonMiniSpace,
            },
          )}
          {(config_IsItCompleted || isEditingEnabled) && (
            <>
              {/* ITEM DETAILS */}
              <ItemDetailsUI
                ref={refItemDetails}
                isItCompletedJobType={config_IsItCompleted}
                commonIconSize={globalContext.commonIconSize}
                commonSpace={commonSpace}
                extraStyles={{
                  ...globalStyles.commonPadding,
                  marginTop: commonMiniSpace,
                  backgroundColor: globalColors.JOB_DETAIL_BG_1,
                }}
                navigation={navigation}
              />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

// <-- Styles -->
const styles = StyleSheet.create({
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
});

export default JobPickup;
