import {combineReducers} from 'redux';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
  // Reducer list
  location: locationReducer,
});

export default rootReducer;
