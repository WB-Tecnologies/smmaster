import {
  OPEN_POST,
  CLOSE_POST,
} from '@/constants/actionTypes';

export const openPost = id => ({
  type: OPEN_POST,
  id,
});

export const closePost = () => ({
  type: CLOSE_POST,
});
