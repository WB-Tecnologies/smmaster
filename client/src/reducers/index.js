import { combineReducers } from 'redux';

import authorization from './authorization';
import posts from './posts';
import currentDate from './currentDate';
import postDetails from './postDetails';

const rootReducer = combineReducers({
  authorization,
  posts,
  currentDate,
  postDetails,
});

export default rootReducer;
