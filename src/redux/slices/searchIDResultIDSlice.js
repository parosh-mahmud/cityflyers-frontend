// searchIDResultIDSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchIDResultIDSlice = createSlice({
  name: 'searchIDResultID',
  initialState: {
    searchId: null,
    resultId: null,
  },
  reducers: {
    setSearchIDResultID: (state, action) => {
      const { searchId, resultId } = action.payload;
      state.searchId = searchId;
      state.resultId = resultId;
    },
  },
});

export const { setSearchIDResultID } = searchIDResultIDSlice.actions;
export const selectSearchIDResultID = (state) => state.searchIDResultID;
export default searchIDResultIDSlice.reducer;
