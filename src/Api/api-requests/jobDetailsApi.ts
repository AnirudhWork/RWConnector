import React from 'react'
import { API_ENDPOINT, API_ERR_MSG, IsInternetAccessAvailable, JOBS_API_ERR, STATUS_CODES, commonHeaders } from '../constants'
import { printLogs } from '../../Utils/log-utils';
import axios from 'axios';
import { SimpleAlert } from '../../Utils/SimpleAlert';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { APIServices } from '../api-services';

//<-- job details api -->
const getJobsDetails = async ( id: number, navigation: DrawerNavigationProp<any, any> ) => {
  const TAG = getJobsDetails.name;
  try {
    const response = await new APIServices( true, navigation ).get( `${API_ENDPOINT.GET_JOB_INFO_BY_JOB_ID}/${id}`, commonHeaders );
    if ( response?.status == STATUS_CODES.SUCCESS ) {
      printLogs( TAG, '| Job details api successful response:', response.data );
      return response;
    }
  } catch ( error ) {
    const knownError = error as any;
    if ( axios.isCancel( error ) ) {
      SimpleAlert( '', API_ERR_MSG.REQ_CANCEL_ERR );
    } else if ( IsInternetAccessAvailable( knownError.response?.status ) && knownError.response?.status == STATUS_CODES.BAD_REQUEST ) {
      printLogs( TAG, '| RESPONSE error with status code 400 while trying to fetch Job details using Job id, ErrorMsg:', knownError.response );
      SimpleAlert( '', JOBS_API_ERR.JOB_NOT_FOUND );
    } else {
      printLogs( TAG, '| Error:', error );
      SimpleAlert( '', API_ERR_MSG.ERR );
    }
  }
}

export default getJobsDetails
