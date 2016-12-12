import { combineReducers } from 'redux';
import StoresReducer from './reducer_stores';
import FeaturesReducer from './reducer_features';

const rootReducer = combineReducers({
  stores: StoresReducer,
  features: FeaturesReducer
});

export default rootReducer;
