import { combineReducers } from 'redux';
import beerReducer from './beerReducer';
// import other reducers if you have any

const rootReducer = combineReducers({
  beer: beerReducer,
  // other reducers...
});

export default rootReducer;
