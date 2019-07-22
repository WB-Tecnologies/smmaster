import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST,
} from '@/constants/actionTypes';

import { getZeroDate } from '@helpers/utils';

export const initialState = {
  items: {},
  error: null,
};

const getPlacedPostAccorgingToDate = (posts, [newPost]) => {
  for (let i = 0; i < posts.length; ++i) {
    if (getZeroDate(posts[i].date) === getZeroDate(newPost.date)) {
      posts[i].items.push(newPost.items[0]);
      return [...posts];
    }
  }
  posts.push(newPost);
  posts.sort((a, b) => (getZeroDate(a.date) - getZeroDate(b.date)));
  return [...posts];
};

const posts = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        items: payload.posts,
        error: null,
      };
    }
    case FETCH_POSTS_FAILURE: {
      return {
        ...state,
        error: payload.error,
        items: {},
      };
    }
    case ADD_POST: {
      return {
        ...state,
        items: getPlacedPostAccorgingToDate(state.items, payload.post),
        error: null,
      };
    }
    default:
      return state;
  }
};

export default posts;
