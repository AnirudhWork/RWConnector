import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {IJobsProps, TJobsListProps} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Jobs: React.FC<TJobsListProps> = ({navigation, jobsData}) => {
  const renderItem = ({item}: {item: IJobsProps}) => {
    const jobType = () => {
      return item['job-type'];
    };

    return (
      <TouchableOpacity key={item?.id} style={styles.jobCards}>
        {/* Content container */}
        <View style={styles.jobCardContent}>
          {/* Logo */}
          <View
            style={{
              backgroundColor: 'red',
              flex: 1,
              height: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.jobTypeIcon,
                jobType() == 1
                  ? {backgroundColor: '#5897FB'}
                  : {backgroundColor: '#FFB800'},
              ]}>
              {jobType() == 1 ? 'P' : 'D'}
            </Text>
          </View>
          {/* Data */}
          <View
            style={{
              backgroundColor: 'green',
              flex: 3,
              height: '100%',
              alignItems: 'center',
            }}>
            {/* first line of the jobs data i.e. date, time etc */}
            <View>
              <Text style={{color: '#000'}}>{item?.['bol-num']}</Text>
            </View>
            {/* 2nd line */}
            <View>{/* ... */}</View>
            {/* 3rd line */}
            <View>{/* ... */}</View>
            {/* 4th line */}
            <View>{/* ... */}</View>
            {/* Note */}
            <View>{/* ... */}</View>
          </View>
          {/* Icon */}
          <View
            style={{
              backgroundColor: 'pink',
              flex: 1,
              height: '100%',
              alignItems: 'center',
            }}>
            <Text>Hello World</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Assuming `id` is a number or string
      />
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 13,
  },
  jobCards: {
    backgroundColor: '#D4F2D6',
    marginVertical: 5,
    borderRadius: 3,
  },
  jobCardContent: {
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  jobTypeIcon: {
    textAlign: 'center',
    color: '#FFF',
    height: 25,
    width: 25,
    borderRadius: 13,
  },
});

export default Jobs;
