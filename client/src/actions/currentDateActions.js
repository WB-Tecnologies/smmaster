import {
  SET_CURRENT_DATE,
} from '@/constants/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setCurrentDate = currentDate => ({
  type: SET_CURRENT_DATE,
  currentDate,
});
