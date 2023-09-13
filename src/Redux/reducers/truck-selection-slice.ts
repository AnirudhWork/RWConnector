import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITruckProps, SelectedTruckInfoSliceProps } from '../../screens/types';

const initialState: SelectedTruckInfoSliceProps = {
    loading: false,
    selectedTruck: {
        id: 0,
        name: '',
        note: '',
    },
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
    },
} );

export const { setLoadingStatus, setSelectedTruckInfo } = truckSelectionSlice.actions;
export default truckSelectionSlice.reducer;
