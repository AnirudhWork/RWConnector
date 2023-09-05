import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IJobDetailsProps, TJobsDetailsProps} from '../types';
import getJobsDetails from '../../Api/Jobs-details-api/job-details-api';
import {printLogs} from '../../Utils/log-utils';
import Loading from '../../Components/Loading';

const JobDetails: React.FC<TJobsDetailsProps> = ({navigation, route}) => {
  const jobId = route.params?.jobId;
  const TAG = JobDetails.name;

  const [jobDetailsData, setJobDetailsData] = useState<IJobDetailsProps>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    printLogs(TAG, '| useEffect loaded');
    if (jobId) {
      handleJobData();
    }
  }, [jobId]);

  // <-- job details api -->
  const handleJobData = async () => {
    setIsLoading(true);
    try {
      const response = await getJobsDetails(jobId, navigation);
      if (response) {
        setJobDetailsData(response.data);
      }
    } finally {
      setIsLoading(false);
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
      <Loading visible={isLoading} />
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
