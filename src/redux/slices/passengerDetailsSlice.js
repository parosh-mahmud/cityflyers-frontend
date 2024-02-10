// passengerDetailsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const passengerDetailsSlice = createSlice({
  name: 'passengerDetails',
  initialState: {
    data: null,
  },
  reducers: {
    setPassengerDetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPassengerDetails } = passengerDetailsSlice.actions;

export const selectPassengerDetails = (state) => state.passengerDetails.data;

export default passengerDetailsSlice.reducer;
