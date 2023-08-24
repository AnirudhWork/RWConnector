import {ReactNode, useState, useMemo, useEffect} from 'react';
import {AuthContextType, UserData} from './types';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const username = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USERNAME);
        const appVersion = await AsyncStorage.getItem(
          ASYNC_STORAGE_KEY.APP_VERSION,
        );
        console.log('\n\n\nAsyncStorage username:', username);
        console.log('\n\n\nAsyncStorage appVersion:', appVersion);
        if (username && appVersion) {
          setData({username, appVersion});
        }
      } catch (error) {
        console.error('Error fetching username from AsyncStorage:', error);
      }
    };
    fetchUserToken();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({data, setData}),
    [data, setData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
