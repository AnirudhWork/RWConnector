export const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export enum API_ENDPOINT {
  LOGIN = '/auth/login',
  FORGOT_PW = '/auth/forgotpwd',
  LOGOUT = '/auth/logout',
  RENEW_TOKEN = '/auth/renew',
  GET_TRUCKS = '/trucks',
  GET_JOBS_FOR_TRUCK = '/jobs/list',
  GET_JOB_INFO_BY_JOB_ID = '/jobs',
  LOCK_JOB = '/jobs/{{JOB_ID}}/lock',
  UNLOCK_JOB = '/jobs/{{JOB_ID}}/unlock',
  INIT_FILE_UPLOAD = '/files/init',
  UPDATE_FILE_UPLOAD_STATUS = '/files/complete',
  SUBMIT_JOB = '/jobs/{{JOB_ID}}',
}

export enum API_ERR_MSG {
  INTERNET_ERR = 'Network Error: Please check your internet connection and try again!',
  ERR = 'Error processing request.',
  REQ_CANCEL_ERR = 'Request interrupted, Please try again!',
  LOGOUT_ERR = 'Session Expired!',
}
