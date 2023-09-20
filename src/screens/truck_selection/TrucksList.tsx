import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Dropdown from '../../Components/DropDown';
import { ITruckProps, IJobsProps, TTruckListProps } from '../types';
import axios from 'axios';
import { SimpleAlert } from '../../Utils/SimpleAlert';
import Loading from '../../Components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_ENDPOINT, API_ERR_MSG, IsInternetAccessAvailable, STATUS_CODES } from '../../Api/constants';
import Jobs from './Jobs';
import { JOB_MSGS, TRUCK_API_ERR_MSG } from './constants';
import { APIServices } from '../../Api/api-services';
import { printLogs } from '../../Utils/log-utils';
import { useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../Components/GlobalContext';
import { Notes } from '../../Components/Notes';
import { setLoadingStatus, setSelectedTruckInfo } from '../../Redux/reducers/truck-selection-slice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { globalColors } from '../../Utils/global-colors';

const TruckList: React.FC<TTruckListProps> = ( { navigation } ) => {
  // <-- Images and Icons -->
  const chevron_down = require( '../../Assets/Icons/chevron-down.png' );
  const chevron_up = require( '../../Assets/Icons/chevron-up.png' );
  const refresh = require( '../../Assets/Icons/ic_refresh.png' );

  // <-- useState declarations -->
  const [selected, setSelected] = useState<ITruckProps | undefined>( undefined );
  const [truckData, setTruckData] = useState<ITruckProps[]>( [] );
  const [isTruckNoteVisible, setIsTruckNoteVisible] = useState( true );
  const [jobsData, setJobsData] = useState<IJobsProps[] | null>( null );
  const [chevronToggle, setChevronToggle] = useState( chevron_down );

  // <-- useContext -->

  let drawerBgColor = useGlobalContext();

  // <-- Redux -->

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector( ( state ) => state.truck.loading );

  // <-- useEffects -->

  useEffect( () => {
    truckList();
  }, [] );

  useEffect( () => {
    if ( selected ) {
      getJobDetailsByTruckId();
      dispatch( setSelectedTruckInfo( selected ) );
    }
  }, [selected] );

  useEffect( () => {
    isTruckNoteVisible
      ? setChevronToggle( chevron_up )
      : setChevronToggle( chevron_down );
  }, [isTruckNoteVisible] );

  // <-- useFocusEffect -->

  useFocusEffect( React.useCallback( () => {
    drawerBgColor.drawerItemBgColor = globalColors.DRAWER_ACTIVE;

    return () => { drawerBgColor.drawerItemBgColor = globalColors.TRANSPARENT; };
  }, [] ) );

  // <-- Truck list api -->

  const truckList = async () => {
    const TAG = truckList.name;
    try {
      dispatch( setLoadingStatus( true ) );
      const response = await new APIServices( true, navigation ).get(
        API_ENDPOINT.GET_TRUCKS,
      );
      if ( response?.status === STATUS_CODES.SUCCESS ) {
        setTruckData( response.data['truck-list'] );
      }
    } catch ( error ) {
      if ( axios.isCancel( error ) ) {
        SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
      } else {
        printLogs( TAG, '| API Error:', error );
        SimpleAlert( '', API_ERR_MSG.ERR );
      }
    } finally {
      dispatch( setLoadingStatus( false ) );
    }
  };

  // <-- Jobs api -->

  const getJobDetailsByTruckId = async () => {
    const TAG = getJobDetailsByTruckId.name;
    setIsTruckNoteVisible( true );
    try {
      dispatch( setLoadingStatus( true ) );
      const response = await new APIServices( true, navigation ).get(
        API_ENDPOINT.GET_JOBS_FOR_TRUCK + `/${selected?.id}`,
      );
      if ( response?.status == STATUS_CODES.SUCCESS ) {
        printLogs( TAG, '| successful response:', response );
        setJobsData( response.data['job-list'] );
      }
    } catch ( error ) {
      const knownError = error as any;
      if ( axios.isCancel( error ) ) {
        SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
      } else if ( IsInternetAccessAvailable( knownError.response?.status ) && knownError.response?.status === STATUS_CODES.BAD_REQUEST ) {
        SimpleAlert( '', TRUCK_API_ERR_MSG.NOTFOUND );
      } else {
        printLogs( TAG, '| API Error:', error );
        SimpleAlert( '', API_ERR_MSG.ERR );
      }
    } finally {
      dispatch( setLoadingStatus( false ) );
    }
  };

  // <-- Activity -->

  return (
    <View style={styles.container}>
      <View style={styles.dropDownRfContainer}>
        <View style={styles.dropDownContainer}>
          <Dropdown
            label="Select Truck"
            data={truckData}
            onSelect={setSelected}
          />
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
              !selected ? { tintColor: '#ccc' } : null,
            ]}
          />
        </TouchableOpacity>
      </View>
      {selected && (
        <View style={styles.truckNoteContainer}>
          <TouchableOpacity
            style={styles.truckNoteButton}
            onPress={() => setIsTruckNoteVisible( !isTruckNoteVisible )}>
            <Text style={styles.truckNoteTitle}>Truck Note</Text>
            <Image source={chevronToggle} style={styles.icon} />
          </TouchableOpacity>
          {isTruckNoteVisible && (
            <Notes notes={selected.note} style={styles.truckNote} />
          )}
        </View>
      )}
      {jobsData && jobsData.length > 0 && (
        <Jobs navigation={navigation} jobsData={jobsData} />
      )}
      {jobsData && jobsData.length < 1 && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{JOB_MSGS.NOT_FOUND}</Text>
        </View>
      )}
      {isLoading && <Loading />}
    </View>
  );
};

// <-- Styles -->

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    height: 35,
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
    padding: 14,
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 3,
  },
  refreshImage: {
    width: 20,
    height: 20,
  },
  truckNote: {
    paddingVertical: 5,
    marginHorizontal: 5,
    color: '#333333',
  },
  truckNoteContainer: {
    marginHorizontal: 13,
    padding: 7,
    backgroundColor: '#DCDDDF',
    borderRadius: 3,
    marginBottom: 3,
  },
  truckNoteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  truckNoteTitle: {
    color: '#8A8A8A',
    fontSize: 13,
  },
} );

export default TruckList;
