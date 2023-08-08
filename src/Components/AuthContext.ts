import {createContext, useContext} from 'react';
import {AuthContextType} from './types';

export const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  } else {
    throw new Error('useAuth must be used within an AuthProvider');
  }
};
