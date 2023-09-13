import { configureStore } from "@reduxjs/toolkit";
import truckSelectionSlice from "./reducers/truck-selection-slice";

export const store = configureStore( {
    reducer: {
        truck: truckSelectionSlice,
    },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;