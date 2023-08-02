import axios from 'axios';
import {stringMd5} from 'react-native-quick-md5';

const BASE_URL = 'https://7z1we1u08b.execute-api.us-east-1.amazonaws.com/stg';

const loginUser = async (username, password) => {
  const passwordHashValue = stringMd5(password);
  const data = {
    uname: username,
    pwd: passwordHashValue,
    'app-version': '1',
    'os-version': '1',
    'device-type': 'a',
  };

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await instance.post('/auth/login', data);
    return response; //return the response if status code is 200
  } catch (error) {
    // Since the error is re-thrown, it will be propagated up the call stack to the nearest enclosing error handler, where it can be caught and handled.
    throw error; // else re-throw the error which will be handled by nearest enclosing error handler
  }
};

export default loginUser;
