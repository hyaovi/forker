import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import errorReducer from './errorReducer';
export default combineReducers({
  search: searchReducer,
  error: errorReducer
});
