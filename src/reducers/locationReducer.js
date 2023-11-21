import {GET_DISTANCE, GET_LAT_LONG_FROM_ADDRESS} from '../actions/types';

const INITIAL_STATE = {
  // Initial state list
  latLongDetails: null,
  distance: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LAT_LONG_FROM_ADDRESS:
      return {...state, latLongDetails: action.payload};
    case GET_DISTANCE:
      return {...state, distance: action.payload};
    default:
      return state;
  }
};
