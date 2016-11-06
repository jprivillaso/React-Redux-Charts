import { combineReducers } from 'redux';
import StoresReducer from './reducer_stores';

const rootReducer = combineReducers({
  stores: StoresReducer
});

export default rootReducer;
