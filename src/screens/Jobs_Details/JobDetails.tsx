import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { IJobDetailsProps, TJobsDetailsProps } from '../types';
import getJobsDetails from '../../Api/api-requests/job-details-api';
import { printLogs } from '../../Utils/log-utils';
import Loading from '../../Components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TAB_NAVIGATOR_SCREEN } from './job-details-constants';
import JobPickup from './job-pickup/JobPickup';
import JobDelivery from './job-delivery/JobDelivery';
import { GLOBAL_COLOR } from '../../Utils/global-colors';
import { globalStyles } from '../../Utils/global-styles';

// <-- Tab Navigator -->
const Tab = createBottomTabNavigator();

const JobDetails: React.FC<TJobsDetailsProps> = ( { navigation, route } ) => {

  // <-- variable declaration -->
  const jobId = route.params?.jobId;
  const jobType = route.params?.jobType;
  const TAG = JobDetails.name;
  let temp: number | null = null;

  // <-- useState declarations -->
  const [jobDetailsData, setJobDetailsData] = useState<IJobDetailsProps>();
  const [isLoading, setIsLoading] = useState( false );
  const [showInfo, setShowInfo] = useState( false );
  const [isItPickup, setIsItPickup] = useState<boolean>();

  // <-- Job Type -->
  const getJobType = () => {
    return jobType == 1;
  }

  // <-- useFocusEffect -->
  useFocusEffect( React.useCallback( () => {
    printLogs( TAG, '| useEffect loaded' );
    setIsItPickup( getJobType() );
    if ( jobId != temp ) {
      handleJobData();
    } else {
      setShowInfo( true );
    }
    return () => { setShowInfo( false ); temp = jobId }
  }, [jobId] ) )

  // <-- get Job Details API -->
  const handleJobData = async () => {
    setIsLoading( true );
    try {
      const response = await getJobsDetails( jobId, navigation );
      if ( response ) {
        setJobDetailsData( response.data );
        setShowInfo( true );
      }
    } finally {
      setIsLoading( false )
    }
  };

  // <-- Activity -->
  return (
    <View
      style={styles.container}>
      <Loading visible={isLoading} />
      {showInfo && (
        <View style={styles.container}>
          <Tab.Navigator initialRouteName={isItPickup ? TAB_NAVIGATOR_SCREEN.PICKUP : TAB_NAVIGATOR_SCREEN.DELIVERY}
            tabBar={() => {
              return (
                <View style={styles.tab}>
                  <TouchableOpacity
                    style={[
                      styles.tabButton, globalStyles.alignCenterStyle,
                      isItPickup ? { backgroundColor: GLOBAL_COLOR.GREEN } : { backgroundColor: GLOBAL_COLOR.GRAY }]}
                    onPress={() => {
                      setIsItPickup( true );
                      navigation.navigate( TAB_NAVIGATOR_SCREEN.PICKUP )
                    }}>
                    <Text style={[globalStyles.fontStyleRegular, styles.tabButtonText]}>
                      {TAB_NAVIGATOR_SCREEN.PICKUP}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabButton, globalStyles.alignCenterStyle,
                    isItPickup ? { backgroundColor: GLOBAL_COLOR.GRAY } : { backgroundColor: GLOBAL_COLOR.GREEN }]}
                    onPress={() => {
                      setIsItPickup( false );
                      navigation.navigate( TAB_NAVIGATOR_SCREEN.DELIVERY )
                    }}>
                    <Text style={[globalStyles.fontStyleRegular, styles.tabButtonText]}>
                      {TAB_NAVIGATOR_SCREEN.DELIVERY}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }}
            backBehavior={"none"}
            detachInactiveScreens={true}
            screenOptions={{
              headerShown: true,
              tabBarShowLabel: false,
              headerStyle: {
                height: 50,
              }
            }}>
            <Tab.Screen name={TAB_NAVIGATOR_SCREEN.PICKUP}>
              {() => <JobPickup jobDetailsData={jobDetailsData} />}
            </Tab.Screen>
            <Tab.Screen name={TAB_NAVIGATOR_SCREEN.DELIVERY}>
              {() => <JobDelivery jobDetailsData={jobDetailsData} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      )
      }
    </View >
  );
};

// <-- Styles -->

const styles = StyleSheet.create( {
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
  }
} );

export default JobDetails;