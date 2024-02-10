// import { createStore, combineReducers } from 'redux';
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';

// // import flightsReducer from './reducers/flightReducer';
// import flightReducer from './reducers/flightSlice';
// import flightSlice from './reducers/flightSlice';
// const middleware = [...getDefaultMiddleware(), thunk];
// const rootReducer = combineReducers({
//   flights: flightReducer,
//   flight: flightSlice,
//   // Add other reducers if you have them
// });

// const store = createStore(rootReducer);

// export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import flightReducer from './reducers/flightSlice';
import airPriceReducer from './slices/airPriceSlice';
import searchIDResultIDReducer from './slices/searchIDResultIDSlice'; // Adjust the path accordingly
import airPreBookReducer from './slices/airPreBookSlice'
import passengerDetailsReducer from './slices/passengerDetailsSlice'
const middleware = [...getDefaultMiddleware(), thunk];

const store = configureStore({
  reducer: {
    flight: flightReducer,
    flights:flightReducer,
    airPrice: airPriceReducer,
    searchIDResultID: searchIDResultIDReducer,
    airPreBook: airPreBookReducer,
    passengerDetails:passengerDetailsReducer,
    // Add other reducers if you have them
  },
  middleware,
});

export default store;



