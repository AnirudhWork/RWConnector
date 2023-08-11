import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Dropdown from '../Components/DropDown';
import {ITruckProps} from '../screens/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getAPI from '../Api/getAPI';
import axios from 'axios';
import CustomMessagePopup from '../Components/CustomMessagePopup';
import Loading from '../Components/Loading';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useAuth} from '../Components/AuthContext';

const Jobs: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const [selected, setSelected] = useState<ITruckProps | undefined>(undefined);
  const [data, setData] = useState<ITruckProps[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {setUserToken} = useAuth();

  useEffect(() => {
    let truckData = async () => {
      const accessToken = await AsyncStorage.getItem('userToken');
      const header = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      };
      const endPoint = '/trucks';

      try {
        setIsLoading(true);
        const response = await getAPI(endPoint, header);
        if (response.status === 200) {
          setData(response.data['truck-list']);
        }
      } catch (error) {
        const knownError = error as any;
        if (axios.isCancel(error)) {
          setPopUpMessage('Request interrupted. Try again!');
        } else if (knownError?.response?.status === 401) {
          setPopUpMessage('Invalid Login! Please login again');
        } else if (knownError?.response?.status === 402) {
          setPopUpMessage('Session Expired');
          setShowPopUp(true);
          AsyncStorage.removeItem('userToken');
          setUserToken(null);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          });
        } else if (knownError.request) {
          console.log(knownError.request);
          setPopUpMessage(
            'Network Error. Please check your internet connection and try again!',
          );
        } else {
          setPopUpMessage('Error processing request. Try again!');
        }
        setShowPopUp(true);
      } finally {
        setIsLoading(false);
      }
    };
    truckData();
  }, []);

  return (
    <View style={styles.container}>
      {(showPopUp && (
        <CustomMessagePopup
          message={popUpMessage}
          visible={showPopUp}
          setPopUpMessage={setPopUpMessage}
          setShowPopUp={setShowPopUp}
        />
      )) ||
        (isLoading && <Loading visible={isLoading} />)}
      <Dropdown label="Select Truck" data={data} onSelect={setSelected} />
      {selected && (
        <Text style={{marginHorizontal: 10}}>Selected: {selected.id}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Jobs;
