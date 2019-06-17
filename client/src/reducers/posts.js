import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '@/constants/actionTypes';

export const initialState = {
  items: {},
  error: null,
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
    default:
      return state;
  }
};

export default posts;
