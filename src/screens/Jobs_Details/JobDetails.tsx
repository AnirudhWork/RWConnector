import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IJobDetailsProps, TJobsDetailsProps} from '../types';
import getJobsDetails from '../../Api/Jobs-details-api/job-details-api';
import {printLogs} from '../../Utils/log-utils';

const JobDetails: React.FC<TJobsDetailsProps> = ({navigation, route}) => {
  const jobId = route.params?.jobId;
  const TAG = JobDetails.name;

  const [jobDetailsData, setJobDetailsData] = useState<IJobDetailsProps>();

  useEffect(() => {
    printLogs(TAG, '| useEffect loaded');
    handleJobData();
  }, []);

  // <-- job details api -->
  const handleJobData = async () => {
    const response = await getJobsDetails(jobId, navigation);
    if (response) {
      setJobDetailsData(response.data);
    }
  };

  // <-- Activity -->
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightpink',
      }}>
      <Text style={{color: 'black', fontWeight: '700'}}>
        {jobDetailsData?.['bol-num']}
      </Text>
      <Text style={{color: 'black', fontWeight: '700'}}>
        {jobDetailsData?.['del-addr']}, {jobDetailsData?.['del-email']}
      </Text>
    </View>
  );
};

export default JobDetails;

// <-- Styles -->

const styles = StyleSheet.create({});
