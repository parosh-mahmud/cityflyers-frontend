import * as actionTypes from './actionTypes';

export const setFlights = (flights) => {
  return {
    type: 'SET_FLIGHTS',
    payload: flights,
  };
};

export const setSearchId = (searchId) => ({
  type: actionTypes.SET_SEARCH_ID,
  payload: searchId
});

export const setSelectedResultId = (resultId) => ({
  type: actionTypes.SET_SELECTED_RESULT_ID,
  payload: resultId
});

