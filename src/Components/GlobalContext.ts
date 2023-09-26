import {createContext, useContext} from 'react';
import {globalColors} from '../Utils/global-colors';

export class GlobalContextModal {
  isItLandScape: boolean = false;
  globalHeight: number = 50;
  commonSpace: number = 15;
  commonMiniSpace: number = 3;
  commonIconSize: number = 25;
  drawerItemBgColor: string = globalColors.DRAWER_ACTIVE;
  constructor(isItLandScape: boolean) {
    this.isItLandScape = isItLandScape;
  }

  setDrawerItemBgColor = (color: string) => {
    this.drawerItemBgColor = color;
  };
}

export const GlobalContext = createContext<GlobalContextModal>(
  new GlobalContextModal(false),
);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context) {
    return context;
  } else {
    throw new Error('useGlobalContext must be used within an AuthProvider');
  }
};
