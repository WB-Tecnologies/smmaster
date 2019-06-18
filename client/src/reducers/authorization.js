import {
  SET_CURRENT_USER,
  AUTHENTICATION_FAILURE,
} from '@/constants/actionTypes';

export const initialState = {
  user: null,
  error: null,
};

const authorization = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        user: payload.user,
        error: null,
      };
    }
    case AUTHENTICATION_FAILURE: {
      return {
        ...state,
        error: payload.error,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default authorization;
