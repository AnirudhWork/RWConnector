import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TJobsDetailsProps} from '../types';
import getJobsDetails from '../../Api/api-requests/jobDetailsApi';
import {printLogs} from '../../Utils/log-utils';
import Loading from '../../Components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  JOB_DETAILS_JOB_TYPE,
  TAB_NAVIGATOR_SCREEN,
} from './job-details-constants';
import JobPickup from './job-pickup/JobPickup';
import JobDelivery from './job-delivery/JobDelivery';
import {globalColors} from '../../Utils/global-colors';
import {globalStyles} from '../../Utils/global-styles';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {setLoadingStatus} from '../../Redux/reducers/truck-selection-slice';
import {
  AlertWithOneActionableOption,
  SimpleAlert,
} from '../../Utils/SimpleAlert';
import {API_ERR_MSG} from '../../Api/constants';
import {setJobDetails} from '../../Redux/reducers/job-details-slice';
import {SCREEN_NAMES} from '../../Navigators/constants';

// <-- Tab Navigator -->
const Tab = createBottomTabNavigator();

const JobDetails: React.FC<TJobsDetailsProps> = ({navigation}) => {
  // <-- Redux -->
  const selectedJobInfo = useAppSelector(state => state.truck.selectedJob);

  // <-- variable declaration -->
  const jobId = selectedJobInfo?.id;
  const jobType = selectedJobInfo?.['job-type'];
  const TAG = JobDetails.name;

  // <-- useState declarations -->
  const [showInfo, setShowInfo] = useState(false);
  const [isItPickup, setIsItPickup] = useState<boolean>();

  // <-- Redux -->
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.truck.loading);

  // <-- Job Type -->
  const getIsItPickup = () => {
    return jobType == JOB_DETAILS_JOB_TYPE.PICKUP;
  };

  // <-- useFocusEffect -->
  useFocusEffect(
    React.useCallback(() => {
      printLogs(TAG, '| useFocusEffect() loaded');
      setIsItPickup(getIsItPickup());
      requestJobDetails();

      return () => setShowInfo(false);
    }, [jobId]),
  );

  // <-- Job Details API -->
  const requestJobDetails = async () => {
    dispatch(setLoadingStatus(true));
    setShowInfo(false);
    const TAG = requestJobDetails.name;
    try {
      if (jobId) {
        const response = await getJobsDetails(jobId, navigation, dispatch);
        if (response) {
          dispatch(setJobDetails(response.data));
          setShowInfo(true);
        }
      }
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };

  // <-- Activity -->
  return (
    <View style={styles.container}>
      {showInfo && (
        <View style={styles.container}>
          <Tab.Navigator
            initialRouteName={
              isItPickup
                ? TAB_NAVIGATOR_SCREEN.PICKUP
                : TAB_NAVIGATOR_SCREEN.DELIVERY
            }
            tabBar={() => {
              return (
                <View style={styles.tab}>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      globalStyles.alignCenterStyle,
                      isItPickup
                        ? {backgroundColor: globalColors.green}
                        : {backgroundColor: globalColors.gray},
                    ]}
                    onPress={() => {
                      setIsItPickup(true);
                      navigation.navigate(TAB_NAVIGATOR_SCREEN.PICKUP);
                    }}>
                    <Text
                      style={[
                        globalStyles.fontStyleRegular,
                        styles.tabButtonText,
                      ]}>
                      {TAB_NAVIGATOR_SCREEN.PICKUP}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      globalStyles.alignCenterStyle,
                      isItPickup
                        ? {backgroundColor: globalColors.gray}
                        : {backgroundColor: globalColors.green},
                    ]}
                    onPress={() => {
                      setIsItPickup(false);
                      navigation.navigate(TAB_NAVIGATOR_SCREEN.DELIVERY);
                    }}>
                    <Text
                      style={[
                        globalStyles.fontStyleRegular,
                        styles.tabButtonText,
                      ]}>
                      {TAB_NAVIGATOR_SCREEN.DELIVERY}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            backBehavior={'none'}
            detachInactiveScreens={true}
            screenOptions={{
              headerShown: true,
              tabBarShowLabel: false,
              headerStyle: {
                height: 50,
              },
            }}>
            <Tab.Screen
              name={TAB_NAVIGATOR_SCREEN.PICKUP}
              component={JobPickup}
            />
            <Tab.Screen
              name={TAB_NAVIGATOR_SCREEN.DELIVERY}
              component={JobDelivery}
            />
          </Tab.Navigator>
        </View>
      )}
      {isLoading && <Loading />}
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    flex: 1,
    padding: 10,
    height: 50,
  },
  tabButtonText: {
    color: '#FFFFFF',
  },
});

export default JobDetails;
