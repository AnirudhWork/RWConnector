import React from 'react'
import { API_ENDPOINT, API_ERR_MSG, JOBS_API_ERR, STATUS_CODES, commonHeaders } from '../constants'
import getApi from '../getAPI';
import { printLogs } from '../../Utils/log-utils';
import axios from 'axios';
import { SimpleAlert } from '../../Utils/SimpleAlert';
import { logoutSessionExpired } from '../../Utils/constants';
import { DrawerNavigationProp } from '@react-navigation/drawer';

//<-- job details api -->
const getJobsDetails = async ( id: number, navigation: DrawerNavigationProp<any, any> ) => {
    const TAG = getJobsDetails.name;
    try {
        const response = await getApi( `${API_ENDPOINT.GET_JOB_INFO_BY_JOB_ID}/${id}`, commonHeaders );
        printLogs( 'Job details by job id RESPONSE:', response );
        if ( response.status == STATUS_CODES.SUCCESS ) {
            printLogs( TAG, '| Job details api successful response:', response );
            return response;
        }
    } catch ( error ) {
        const knownError = error as any;
        if ( axios.isCancel( error ) ) {
            SimpleAlert( '', 'Request cancelled' );
        } else if ( knownError.response?.status == STATUS_CODES.BAD_REQUEST ) {
            printLogs( TAG, '| RESPONSE error with status code 400 while trying to fetch Job details using Job id, ErrorMsg:', knownError.response );
            SimpleAlert( '', JOBS_API_ERR.JOB_NOT_FOUND );
        } else if ( knownError.response ) {
            printLogs( TAG, 'RESPONSE error, token expired or invalid. ErrorMsg:', knownError.response );
            logoutSessionExpired( navigation );
        } else {
            printLogs( TAG, '| Jobs details by Job id else block Error:', error );
            SimpleAlert( '', API_ERR_MSG.ERR );
        }
    }
}

export default getJobsDetails