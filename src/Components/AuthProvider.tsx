import { ReactNode, useState, useMemo } from 'react';
import { AuthContextType } from './types';
import { AuthContext } from './AuthContext';

const AuthProvider = ( { children }: { children: ReactNode } ) => {
  const [data, setData] = useState<string>( '#007f00' );

  const value: AuthContextType = useMemo(
    () => ( { data, setData } ),
    [data, setData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
