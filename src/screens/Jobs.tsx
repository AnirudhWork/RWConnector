import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Dropdown from '../Components/DropDown';
import {ITruckProps, IJobsProps} from '../screens/types';
import GET_API from '../Api/getAPI';
import axios from 'axios';
import {
  SimpleAlert,
  AlertWithOneActionableOption,
} from '../Components/SimpleAlert';
import Loading from '../Components/Loading';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Jobs: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  // <-- Images and Icons -->
  const chevron_down = require('../Assets/Icons/chevron-down.png');
  const chevron_up = require('../Assets/Icons/chevron-up.png');
  const refresh = require('../Assets/Icons/ic_refresh.png');

  // <-- useState declarations -->
  const [selected, setSelected] = useState<ITruckProps | undefined>(undefined);
  const [data, setData] = useState<ITruckProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTruckNoteVisible, setIsTruckNoteVisible] = useState(true);
  const [jobsData, setJobsData] = useState<IJobsProps[] | undefined>(undefined);
  const [chevronToggle, setChevronToggle] = useState(chevron_down);

  // <-- useEffects -->

  useEffect(() => {
    truckList();
  }, []);

  useEffect(() => {
    if (selected) {
      getJobDetailsByTruckId();
    }
  }, [selected]);

  useEffect(() => {
    isTruckNoteVisible
      ? setChevronToggle(chevron_up)
      : setChevronToggle(chevron_down);
  }, [isTruckNoteVisible]);

  // <-- Truck list api -->

  const truckList = async () => {
    const endPoint = '/trucks';
    try {
      setIsLoading(true);
      const response = await GET_API(endPoint);
      if (response.status === 200) {
        setData(response.data['truck-list']);
      }
    } catch (error) {
      const knownError = error as any;
      if (axios.isCancel(error)) {
        SimpleAlert('', 'Request interrupted. Try again!');
      } else if (
        knownError.response ||
        knownError?.response?.status === 401 ||
        knownError?.response?.status === 402
      ) {
        AlertWithOneActionableOption(
          '',
          'Session expired!',
          'Ok',
          false,
          handleLogOut,
        );
      } else {
        console.log('\n\n\n\nerror:', error);
        SimpleAlert('', 'Error processing request. Try again!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // <-- Jobs api -->

  const getJobDetailsByTruckId = async () => {
    const endPoint = `/jobs/list/${selected?.id}`;
    setIsTruckNoteVisible(true);
    try {
      setIsLoading(true);
      const response = await GET_API(endPoint);
      if (response.status === 200) {
        setJobsData(response.data['job-list']);
      }
    } catch (error) {
      const knownError = error as any;
      if (axios.isCancel(error)) {
        SimpleAlert('', 'Request interrupted. Try again!');
      } else if (knownError?.response?.status === 400) {
        SimpleAlert('', 'Truck does not exist. Reload and try again!');
      } else if (
        knownError.response ||
        knownError?.response?.status === 401 ||
        knownError?.response?.status === 402
      ) {
        AlertWithOneActionableOption(
          '',
          'Session expired!',
          'Ok',
          false,
          handleLogOut,
        );
      } else {
        console.log('\n\n\n\nerror:', error);
        SimpleAlert('', 'Error processing request. Try again!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // <-- Logout api -->

  const handleLogOut = () => {
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('appVersion');
    AsyncStorage.removeItem('username');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      {isLoading && <Loading visible={isLoading} />}
      <View style={styles.dropDownRfContainer}>
        <View style={styles.dropDownContainer}>
          <Dropdown label="Select Truck" data={data} onSelect={setSelected} />
        </View>
        <TouchableOpacity
          onPress={() => {
            truckList();
            getJobDetailsByTruckId();
          }}
          disabled={!selected}
          style={styles.refreshButton}>
          <Image
            source={refresh}
            style={[
              styles.refreshImage,
              !selected ? {tintColor: '#ccc'} : null,
            ]}
          />
        </TouchableOpacity>
      </View>
      {selected && (
        <View style={styles.truckNoteContainer}>
          <TouchableOpacity
            style={styles.truckNoteButton}
            onPress={() => setIsTruckNoteVisible(!isTruckNoteVisible)}>
            <Text style={styles.truckNoteTitle}>Truck Note</Text>
            <Image source={chevronToggle} style={styles.icon} />
          </TouchableOpacity>
          {isTruckNoteVisible && (
            <Text style={styles.truckNote}>{selected.note}</Text>
          )}
        </View>
      )}
      {jobsData && jobsData.length > 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {jobsData.map((jobsData: any) => (
            <Text key={jobsData.id}>{jobsData['job-name']}</Text>
          ))}
        </View>
      )}
      {jobsData && jobsData.length < 1 && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>No job is assigned yet to the selected truck</Text>
        </View>
      )}
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    height: 30,
  },
  dropDownRfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingTop: 13,
    marginBottom: 5,
  },
  dropDownContainer: {
    flex: 1,
  },
  refreshButton: {
    borderColor: '#DCDDDF',
    padding: 12,
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 3,
  },
  refreshImage: {
    width: 24,
    height: 24,
  },
  truckNote: {
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  truckNoteContainer: {
    marginHorizontal: 13,
    padding: 7,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
  },
  truckNoteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  truckNoteTitle: {
    fontSize: 13,
  },
});

export default Jobs;
