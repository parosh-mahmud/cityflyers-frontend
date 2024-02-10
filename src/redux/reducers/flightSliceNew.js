// flightSliceNew.js

import { createSlice } from '@reduxjs/toolkit';

const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    searchId: null,
    results: [],
  },
  reducers: {
    setSearchID: (state, action) => {
      state.searchId = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setSearchID, setResults } = flightSlice.actions;
export const selectSearchID = (state) => state.flights.searchId;
export const selectResults = (state) => state.flights.results;

export default flightSlice.reducer;
