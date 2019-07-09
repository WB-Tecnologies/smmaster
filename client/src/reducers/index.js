import { combineReducers } from 'redux';

import authorization from './authorization';
import posts from './posts';
import currentDate from './currentDate';

const rootReducer = combineReducers({
  authorization,
  posts,
  currentDate,
});

export default rootReducer;
