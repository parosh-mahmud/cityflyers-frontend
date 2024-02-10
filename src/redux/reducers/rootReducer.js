// rootReducer.js
import { combineReducers } from 'redux';
import flightReducer from './flightSlice'; // Update with the actual path
import searchIDResultIDReducer from '../slices/searchIDResultIDSlice'
const rootReducer = combineReducers({
  flight: flightReducer,
  searchIDResultID: searchIDResultIDReducer,
  // Add other reducers here if you have them
});

export default rootReducer;
