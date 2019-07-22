import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST,
} from '@/constants/actionTypes';

import { API } from '@/helpers/requests';

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts },
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error },
});

export const addPostSuccess = post => ({
  type: ADD_POST,
  payload: { post },
});

export function fetchPosts() {
  return dispatch => {
    return API.getPosts()
      .then(({ posts }) => {
        dispatch(fetchPostsSuccess(posts));
      })
      .catch(error => dispatch(fetchPostsFailure(error.message)));
  };
}

export function addPost(post, date) {
  return dispatch => {
    return API.addPost(post, date)
      .then(({ post }) => {
        dispatch(addPostSuccess(post));
      })
      .catch(error => dispatch(fetchPostsFailure(error.message)));
  };
}
