import {DrawerNavigationProp} from '@react-navigation/drawer';
import {APIServices} from '../api-services';
import {
  API_ENDPOINT,
  API_ERR_MSG,
  IsInternetAccessAvailable,
  STATUS_CODES,
} from '../constants';
import {printLogs} from '../../Utils/log-utils';
import {SimpleAlert} from '../../Utils/SimpleAlert';

export const getTrucksList = async (
  navigation: DrawerNavigationProp<any, any>,
) => {
  const TAG = getTrucksList.name;

  try {
    const response = await new APIServices(true, navigation).get(
      API_ENDPOINT.GET_TRUCKS,
    );
    if (response?.status == STATUS_CODES.SUCCESS) {
      printLogs(TAG, '| successful RESPONSE:', response.data);
      return response;
    }
  } catch (error: any) {
    if (IsInternetAccessAvailable(error?.response?.status)) {
      printLogs(TAG, '| Error:', error);
      SimpleAlert('', API_ERR_MSG.ERR);
    }
  }
};
