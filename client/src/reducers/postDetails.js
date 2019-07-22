import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_STARTED,
  CHECK_ACCOUNT,
} from '@/constants/actionTypes';

export const initialState = {
  items: {},
  error: null,
  loading: false,
};

const postDetails = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POST_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        items: payload.post,
        error: null,
        loading: false,
      };
    }
    case FETCH_POST_FAILURE: {
      return {
        ...state,
        error: payload.error,
        loading: false,
        items: {},
      };
    }
    case CHECK_ACCOUNT: {
      return {
        ...state,
        error: null,
        loading: false,
        items: {},
      };
    }
    default:
      return state;
  }
};

export default postDetails;
