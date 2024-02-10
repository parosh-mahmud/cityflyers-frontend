


import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// flightSlice.js

const flightSlice = createSlice({
  name: 'flight',
  initialState: {
    searchData: null,
    isLoadingFlightData: false,
  },
  reducers: {
    setFlightSearchData: (state, action) => {
      state.searchData = action.payload;
      state.isLoadingFlightData = false;
    },
    setLoadingFlightData: (state) => {
      state.isLoadingFlightData = true;
    },
  },
});

export const { setFlightSearchData, setLoadingFlightData } = flightSlice.actions;

// Async action using Thunk middleware
export const fetchFlightResults = (formData) => async (dispatch) => {
  try {
    // Dispatch loading status
    dispatch(setLoadingFlightData());

    // Make the API call using formData
    const response = await axios.post('http://localhost:5000/api/airSearch', formData);

    // Dispatch the result to the store
    dispatch(setFlightSearchData(response.data));

    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error fetching flight results:', error.message);
  }
};

export const selectFlightSearchData = (state) => state.flight.searchData;

export default flightSlice.reducer;
