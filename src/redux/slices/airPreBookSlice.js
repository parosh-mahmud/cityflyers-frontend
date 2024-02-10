// airPreBookSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const airPreBookSlice = createSlice({
  name: 'airPreBook',
  initialState: {
    searchData: null,
    isLoadingAirPreBookData: false,
    error: null,
  },
  reducers: {
    setAirPreBookSearchData: (state, action) => {
      state.searchData = action.payload;
      state.isLoadingAirPreBookData = false;
      state.error = null; // Reset error when data is successfully fetched
    },
    setLoadingAirPreBookData: (state) => {
      state.isLoadingAirPreBookData = true;
      state.error = null; // Reset error when starting to fetch data
    },
    setErrorAirPreBookData: (state, action) => {
      state.error = action.payload;
      state.isLoadingAirPreBookData = false;
    },
    resetLoadingAirPreBookData: (state) => {
      state.isLoadingAirPreBookData = false;
    },
  },
});

export const {
  setAirPreBookSearchData,
  setLoadingAirPreBookData,
  setErrorAirPreBookData,
  resetLoadingAirPreBookData,
} = airPreBookSlice.actions;

export const fetchAirPreBookResults = (formData) => async (dispatch) => {
  try {
    dispatch(setLoadingAirPreBookData());

    const response = await axios.post('http://localhost:5000/api/airPreBook', formData);

   await dispatch(setAirPreBookSearchData(response.data));
    console.log(formData)
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error fetching air pre-book results:', error.message);
    dispatch(setErrorAirPreBookData(error.message));
  }
};

export const selectAirPreBookSearchData = (state) => state.airPreBook.searchData;

export default airPreBookSlice.reducer;
