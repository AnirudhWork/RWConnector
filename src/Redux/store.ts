import { configureStore } from "@reduxjs/toolkit";
import truckSelectionSlice from "./reducers/truck-selection-slice";
import jobDetailsSlice from "./reducers/job-details-slice";

export const store = configureStore( {
  reducer: {
    truck: truckSelectionSlice,
    jobDetails: jobDetailsSlice,
  },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;