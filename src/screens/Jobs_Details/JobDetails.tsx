import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { IJobDetailsProps, TJobsDetailsProps } from '../types';
import getJobsDetails from '../../Api/api-requests/job-details-api';
import { printLogs } from '../../Utils/log-utils';
import Loading from '../../Components/Loading';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TAB_NAVIGATOR_SCREEN } from './job-details-constants';
import JobPickup from './job-pickup/JobPickup';
import JobDelivery from './job-delivery/JobDelivery';

const Tab = createBottomTabNavigator();

const JobDetails: React.FC<TJobsDetailsProps> = ( { navigation, route } ) => {
  const jobId = route.params?.jobId;
  const jobType = route.params?.jobType;
  const TAG = JobDetails.name;
  let temp: number | null = null;

  const [jobDetailsData, setJobDetailsData] = useState<IJobDetailsProps>();
  const [isLoading, setIsLoading] = useState( false );
  const [showInfo, setShowInfo] = useState( false );

  const initialRouteName = () => {
    return jobType == 1 ? TAB_NAVIGATOR_SCREEN.PICKUP : TAB_NAVIGATOR_SCREEN.DELIVERY;
  }

  useFocusEffect( React.useCallback( () => {
    printLogs( TAG, '| useEffect loaded' );
    if ( jobId != temp ) {
      handleJobData();
    } else {
      setShowInfo( true );
    }
    return () => { setShowInfo( false ); temp = jobId }
  }, [jobId] ) )

  // <-- job details api -->
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
        <View style={{ flex: 1 }}>
          <Tab.Navigator initialRouteName={initialRouteName()}
            tabBar={() => {
              return (
                <View style={styles.tab}>
                  <TouchableOpacity style={styles.tabButton}>
                    <Text>{TAB_NAVIGATOR_SCREEN.PICKUP}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tabButton}>
                    <Text>{TAB_NAVIGATOR_SCREEN.DELIVERY}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
            backBehavior={"none"}
            detachInactiveScreens={true}
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}>
            <Tab.Screen name={TAB_NAVIGATOR_SCREEN.PICKUP} component={JobPickup} />
            <Tab.Screen name={TAB_NAVIGATOR_SCREEN.DELIVERY} component={JobDelivery} />
          </Tab.Navigator>
        </View>
      )}
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'green',
  },
} );

export default JobDetails;