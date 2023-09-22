import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJobsProps, ITruckProps, SelectedTruckInfoSliceProps } from '../../screens/types';

const initialState: SelectedTruckInfoSliceProps = {
  loading: false,
  selectedTruck: {
    id: 0,
    name: '',
    note: '',
  },
  selectedJob: undefined,
};

const truckSelectionSlice = createSlice( {
  name: 'truck',
  initialState,
  reducers: {
    setLoadingStatus: ( state, action: PayloadAction<boolean> ) => {
      state.loading = action.payload;
    },
    setSelectedTruckInfo: ( state, action: PayloadAction<ITruckProps> ) => {
      state.selectedTruck = action.payload;
    },
    setSelectedJobInfo: ( state, action: PayloadAction<IJobsProps> ) => {
      state.selectedJob = action.payload;
    }
  },
} );

export const { setLoadingStatus, setSelectedTruckInfo, setSelectedJobInfo } = truckSelectionSlice.actions;
export default truckSelectionSlice.reducer;
