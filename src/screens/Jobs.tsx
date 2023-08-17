import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Dropdown from '../Components/DropDown';
import {ITruckProps} from '../screens/types';
import GET_API from '../Api/getAPI';
import axios from 'axios';
import CustomMessagePopup from '../Components/CustomMessagePopup';
import Loading from '../Components/Loading';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Jobs: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const chevron_down = require('../Assets/Icons/chevron-down.png');
  const chevron_up = require('../Assets/Icons/chevron-up.png');
  const refresh = require('../Assets/Icons/ic_refresh.png');
  const [selected, setSelected] = useState<ITruckProps | undefined>(undefined);
  const [data, setData] = useState<ITruckProps[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTruckNoteVisible, setIsTruckNoteVisible] = useState(true);
  const [chevronToggle, setChevronToggle] = useState(chevron_down);

  useEffect(() => {
    truckData();
  }, []);

  useEffect(() => {
    isTruckNoteVisible
      ? setChevronToggle(chevron_up)
      : setChevronToggle(chevron_down);
  }, [isTruckNoteVisible]);

  let truckData = async () => {
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
        setPopUpMessage('Request interrupted. Try again!');
      } else if (
        knownError.response ||
        knownError?.response?.status === 401 ||
        knownError?.response?.status === 402
      ) {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('username');
        setPopUpMessage('Session Timed Out!');
      } else {
        console.log('\n\n\n\nerror:', error);
        setPopUpMessage('Error processing request. Try again!');
      }
      setShowPopUp(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      {(showPopUp && (
        <CustomMessagePopup
          message={popUpMessage}
          visible={showPopUp}
          setPopUpMessage={setPopUpMessage}
          setShowPopUp={setShowPopUp}
          onClearMessage={handleLogOut}
        />
      )) ||
        (isLoading && <Loading visible={isLoading} />)}
      <View style={styles.dropDownRfContainer}>
        <View style={styles.dropDownContainer}>
          <Dropdown label="Select Truck" data={data} onSelect={setSelected} />
        </View>
        <TouchableOpacity onPress={truckData} style={styles.refreshButton}>
          <Image source={refresh} style={styles.refreshImage} />
        </TouchableOpacity>
      </View>
      {selected && (
        <View style={styles.truckNoteContainer}>
          <TouchableOpacity
            style={styles.truckNoteButton}
            onPress={() => setIsTruckNoteVisible(!isTruckNoteVisible)}>
            <Text>Truck Note</Text>
            <Image source={chevronToggle} style={styles.icon} />
          </TouchableOpacity>
          {isTruckNoteVisible && (
            <Text style={styles.truckNote}>{selected.note}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  truckNoteContainer: {
    marginHorizontal: 10,
    padding: 7,
    backgroundColor: '#e8e8e8',
  },
  truckNoteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    height: 30,
  },
  dropDownRfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 5,
  },
  dropDownContainer: {
    flex: 1,
  },
  refreshButton: {
    borderColor: 'rgba(51, 51, 51, 0.50)',
    padding: 12,
    borderWidth: 1,
    alignContent: 'center',
  },
  refreshImage: {
    width: 24,
    height: 24,
  },
  truckNote: {
    paddingVertical: 5,
  },
});

export default Jobs;
