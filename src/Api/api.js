import axios from 'axios';

const BASE_URL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

const Api = async (headerObj, dataObj, endPoint) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: headerObj,
  });

  try {
    const response = await instance.post(endPoint, dataObj);
    return response; //return the response if status code is 200
  } catch (error) {
    // Since the error is re-thrown, it will be propagated up the call stack to the nearest enclosing error handler, where it can be caught and handled.
    throw error; // else re-throw the error which will be handled by nearest enclosing error handler
  }
};

export default Api;
