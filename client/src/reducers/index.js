import { combineReducers } from 'redux';

import authorization from './authorization';
import posts from './posts';
import currentDate from './currentDate';
import postDetails from './postDetails';
import displayPost from './displayPost';

const rootReducer = combineReducers({
  authorization,
  posts,
  currentDate,
  postDetails,
  displayPost,
});

export default rootReducer;
