import {DrawerNavigationProp} from '@react-navigation/drawer';
import {APIServices} from '../api-services';
import {
  API_ENDPOINT,
  API_ERR_MSG,
  IsInternetAccessAvailable,
  JOBS_API_ERR,
  STATUS_CODES,
} from '../constants';
import {printLogs} from '../../Utils/log-utils';
import {SimpleAlert} from '../../Utils/SimpleAlert';
import {ThunkDispatch} from '@reduxjs/toolkit';

//<-- Jobs List API -->
export const getJobDetailsByTruckId = async (
  truck_id: number,
  navigation: DrawerNavigationProp<any, any>,
  dispatch: ThunkDispatch<any, any, any>,
) => {
  const TAG = getJobDetailsByTruckId.name;

  try {
    const response = await new APIServices(true, navigation, dispatch).get(
      `${API_ENDPOINT.GET_JOBS_FOR_TRUCK}/${truck_id}`,
    );

    if (response?.status == STATUS_CODES.SUCCESS) {
      printLogs(
        TAG,
        '| Successful RESPONSE | dispatch(setCompleteJobInfo) -',
        response.data,
      );
      return response;
    }
  } catch (error: any) {
    if (
      IsInternetAccessAvailable(error?.response?.status) &&
      error?.response?.status === STATUS_CODES.BAD_REQUEST
    ) {
      printLogs(
        TAG,
        '| RESPONSE error with status code 400 while trying to fetch JOB LIST using TRUCK ID. Error Msg:',
        error.response,
      );
      SimpleAlert('', JOBS_API_ERR.JOB_NOT_FOUND);
    } else {
      printLogs(TAG, '| Error:', error);
      SimpleAlert('', API_ERR_MSG.ERR);
    }
  }
};
