import { createSlice } from '@reduxjs/toolkit';

interface StateProps {
  donors: any[];
}

const initialState: StateProps = {
  donors: []
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    loadDonor: (state, action) => {
      state.donors = action.payload;
    }
  }
});

export const { loadDonor } = requestSlice.actions;
export default requestSlice.reducer;
