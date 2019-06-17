import { combineReducers } from 'redux';

import authorization from './authorization';
import posts from './posts';

const rootReducer = combineReducers({
  authorization,
  posts,
});

export default rootReducer;
