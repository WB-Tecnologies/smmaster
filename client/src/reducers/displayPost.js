import {
  OPEN_POST,
  CLOSE_POST,
} from '@/constants/actionTypes';

export const initialState = {
  isOpen: false,
  id: '',
};

const displayPost = (state = initialState, { type, id }) => {
  switch (type) {
    case OPEN_POST: {
      return {
        isOpen: true,
        id,
      };
    }
    case CLOSE_POST: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return state;
  }
};

export default displayPost;
