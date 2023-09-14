import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IJobDetailsProps, JobDetailsSliceProps } from "../../screens/types";

const initialState: JobDetailsSliceProps = {
  jobDetails: undefined,
}

const jobDetailsSlice = createSlice( {
  name: 'jobDetails',
  initialState,
  reducers: {
    setJobDetails: ( state, action: PayloadAction<IJobDetailsProps> ) => {
      state.jobDetails = action.payload;
    }
  }
} );

export const { setJobDetails } = jobDetailsSlice.actions;
export default jobDetailsSlice.reducer;