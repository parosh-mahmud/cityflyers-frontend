// flightSlice.js
import { createSlice } from '@reduxjs/toolkit';

const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: [],
    searchID: null,
    searchData: null,
    flightSearchData: null,
  },
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setSearchID: (state, action) => {
      state.searchID = action.payload;
    },
    setFlightSearchData: (state, action) => {
      state.flightSearchData = action.payload;
    },
  },
});

export const { setFlights, setSearchID, setFlightSearchData } = flightSlice.actions;
export const selectFlights = (state) => state.flights.flights;
export const selectSearchID = (state) => state.flights.searchID;
export const selectFlightSearchData = (state) => state.flights.flightSearchData;

export default flightSlice.reducer;
