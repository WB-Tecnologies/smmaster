import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_STARTED,
  CHECK_ACCOUNT,
} from '@/constants/actionTypes';

import { httpRequests } from '@/helpers/requests';

const fetchPostSuccess = post => ({
  type: FETCH_POST_SUCCESS,
  payload: { post },
});

const fetchPostFailure = error => ({
  type: FETCH_POST_FAILURE,
  payload: { error },
});

const fetchPostStarted = () => ({
  type: FETCH_POST_STARTED,
});

export function fetchPost() {
  return dispatch => {
    dispatch(fetchPostStarted());
    return httpRequests
      .getPostDetails()
      .then(({ post }) => {
        dispatch(fetchPostSuccess(post));
      })
      .catch(error => dispatch(fetchPostFailure(error.message)));
  };
}

export const checkAccount = id => ({
  type: CHECK_ACCOUNT,
  id,
});
