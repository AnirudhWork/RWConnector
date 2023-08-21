import axiosInstance from './Interceptor';

const GET_API = async (endPoint: string, headerObj?: any) => {
  try {
    const response = await axiosInstance.get(endPoint, {
      headers: headerObj,
    });
    return response; // return the response if status code is 200
  } catch (error) {
    // Since the error is re-thrown, it will be propagated up the call stack to the nearest enclosing error handler, where it can be caught and handled.
    throw error; // else re-throw the error which will be handled by nearest enclosing error handler
  }
};

export default GET_API;
