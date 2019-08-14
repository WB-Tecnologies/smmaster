import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST,
  REMOVE_POST,
} from '@/constants/actionTypes';

import { API } from '@/helpers/requests';

const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts },
});

const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error },
});

const addPostSuccess = post => ({
  type: ADD_POST,
  payload: { post },
});

const removePostSuccess = id => ({
  type: REMOVE_POST,
  payload: { id },
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

export function removePost(id) {
  return dispatch => {
    return API.removePost(id)
      .then(({ id }) => {
        dispatch(removePostSuccess(id));
      })
      .catch(error => dispatch(fetchPostsFailure(error.message)));
  };
}
