import {
  SET_CURRENT_DATE,

} from '@/constants/actionTypes';

export const setCurrentDate = currentDate => ({
  type: SET_CURRENT_DATE,
  currentDate,
});
