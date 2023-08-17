import {ReactNode, useState, useMemo, useEffect} from 'react';
import {AuthContextType} from './types';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [data, setData] = useState<null | string>(null);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        console.log('\n\n\nAsyncStorage data:', username);
        if (username) {
          console.log('Entered if statement!');
          setData(username);
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
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
