import {ReactNode, useState, useMemo, useEffect} from 'react';
import {AuthContextType} from './types';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [userToken, setUserToken] = useState<null | string>(null);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };
    fetchUserToken();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({userToken, setUserToken}),
    [userToken, setUserToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
