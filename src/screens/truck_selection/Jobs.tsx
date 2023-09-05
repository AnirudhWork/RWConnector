import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { IJobsProps, TJobsListProps } from '../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from '@rneui/base';
import moment, { unix } from 'moment';
import { JOB_STATUS } from './constants';
import { DRAWER_SCREEN_NAMES } from '../../Navigators/constants';
import { DrawerActions } from '@react-navigation/native';

const Jobs: React.FC<TJobsListProps> = ( { navigation, jobsData } ) => {
  console.log( '\n\n\n\n\n\n\nJobs data:', jobsData );

  // <-- Cards Info -->

  const renderItem = ( { item }: { item: IJobsProps } ) => {
    const jobType = () => {
      return item['job-type'];
    };

    // <-- Notes Verification -->

    let jobNotes = !!item['job-notes'];

    // <-- Job bg color -->

    let jobLockStatus = item['job-locked'];
    let jobBackgroundColor =
      jobLockStatus == JOB_STATUS.LOCKED
        ? '#5897FB4D'
        : jobLockStatus == JOB_STATUS.COMPLETED
          ? '#D4F2D6'
          : '#F5F5F5';

    // <-- Date convertion -->

    let jobDate: string = moment( unix( item?.['job-date'] ) ).format(
      'DD MMM, h:mm a',
    );
    let jobEndDate: string = moment( unix( item?.['job-end-date'] ) ).format(
      'h:mm a',
    );
    let convertedDT: string = `${jobDate} - ${jobEndDate}`;

    // <-- Job Details navigation -->

    const handleNavigation = () => {
      navigation.dispatch(
        DrawerActions.jumpTo( DRAWER_SCREEN_NAMES.JOB_DETAILS, {
          jobId: item?.id,
        } ),
      );
    };

    // <-- Activity -->

    return (
      <TouchableOpacity
        key={item?.id}
        style={[styles.jobCards, { backgroundColor: jobBackgroundColor }]}
        onPress={handleNavigation}>
        {/* Content container */}
        <View style={styles.jobCardContent}>
          {/* Logo */}
          <View
            style={[
              styles.logoContainer,
              jobType() == 1
                ? { backgroundColor: '#5897FB' }
                : { backgroundColor: '#FFB800' },
            ]}>
            <Text style={styles.jobTypeIcon}>{jobType() == 1 ? 'P' : 'D'}</Text>
          </View>

          {/* Cards */}
          <View style={styles.userInfo}>
            {/* Head */}
            <View style={styles.numberAndDTContainer}>
              <Text style={styles.tkNumber}>{item?.['bol-num']}</Text>
              <View style={styles.borderLine} />
              <Text style={styles.dT}>{convertedDT}</Text>
            </View>

            {/* Address */}
            <Text style={styles.jobName}>{item?.['job-name']}</Text>

            <Text style={styles.jobAdr}>{item?.['job-addr']}</Text>

            <Text style={styles.loc}>
              {item?.['job-city']}, {item?.['job-state']} {item?.['job-zip']}
            </Text>

            {/* Notes */}
            {jobNotes && (
              <View style={styles.noteContainer}>
                <Image
                  source={require( '../../Assets/Icons/ic_notes.png' )}
                  resizeMode={'contain'}
                  style={{ width: 13, height: 13 }}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.note}>
                  {item?.['job-notes']}
                </Text>
              </View>
            )}
          </View>

          {/* Arrow */}
          <View style={styles.arrowIconContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.arrowIcon}
              source={require( '../../Assets/Icons/gtr_icon.png' )}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      <FlatList
        data={jobsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginHorizontal: 13,
  },
  logoContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 / 2,
  },
  jobCards: {
    flex: 1,
    padding: 15,
    marginBottom: 3,
    borderRadius: 3,
  },
  jobCardContent: {
    flexDirection: 'row',
  },
  jobTypeIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  numberAndDTContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tkNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  borderLine: {
    width: 0.5,
    height: '100%',
    backgroundColor: '#8A8A8A',
    marginRight: 15,
    marginLeft: 15,
    padding: 0.5,
  },
  dT: {
    color: '#858C91',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  jobName: {
    fontFamily: 'Inter-Regular',
    fontWeight: 'bold',
    marginTop: 3,
    color: '#000000',
  },
  jobAdr: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
    marginTop: 3,
  },
  loc: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
    marginTop: 3,
  },
  noteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  note: {
    marginLeft: 15,
    color: '#FF0000',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  arrowIcon: {
    width: 25,
    height: 25,
  },
} );

export default Jobs;
