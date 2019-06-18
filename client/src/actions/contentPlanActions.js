import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '@/constants/actionTypes';

import { httpRequests } from '@/helpers/requests';

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts },
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error },
});

export function fetchPosts() {
  return dispatch => {
    return httpRequests
      .getPosts()
      .then(({ posts }) => {
        dispatch(fetchPostsSuccess(posts));
      })
      .catch(error => dispatch(fetchPostsFailure(error.message)));
  };
}
