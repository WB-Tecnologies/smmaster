import {
  SET_CURRENT_DATE,
} from '@/constants/actionTypes';

export const initialState = {
  date: new Date(),
};

const currentDate = (state = initialState, { type, currentDate }) => {
  switch (type) {
    case SET_CURRENT_DATE: {
      return {
        ...state,
        date: currentDate,
      };
    }
    default:
      return state;
  }
};

export default currentDate;
