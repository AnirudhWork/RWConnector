import React, { ReactNode, useState, useMemo } from 'react';
import { GlobalContext, GlobalContextModal } from './GlobalContext';
import { isLandscapeSync } from 'react-native-device-info';

const GlobalContextProvider = ( { children }: { children: ReactNode } ) => {
  const [isItLandScape, setIsItLandScape] = useState<boolean>( isLandscapeSync() );

  const contextValue: GlobalContextModal = useMemo( () => {
    let isLandScape = isLandscapeSync();
    setIsItLandScape( isLandScape );
    return new GlobalContextModal( isItLandScape );
  }, [isItLandScape] );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
