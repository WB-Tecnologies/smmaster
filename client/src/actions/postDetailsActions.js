import {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_STARTED,
  CHECK_ACCOUNT,
  EDIT_DATE,
  SELECT_RUBRIC,
  LOAD_IMAGE_SUCCESS,
  LOAD_IMAGE_FAILURE,
  LOAD_IMAGE_STARTED,
} from '@/constants/actionTypes';

import { API } from '@/helpers/requests';

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
    return API.getPostDetails()
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

export const editDate = date => ({
  type: EDIT_DATE,
  date,
});

export const selectRubric = id => ({
  type: SELECT_RUBRIC,
  id,
});

const loadImageSuccess = post => ({
  type: LOAD_IMAGE_SUCCESS,
  payload: { post },
});

const loadImageFailure = error => ({
  type: LOAD_IMAGE_FAILURE,
  payload: { error },
});

const loadImageStarted = () => ({
  type: LOAD_IMAGE_STARTED,
});

export function loadImage() {
  return dispatch => {
    dispatch(loadImageStarted());
    return API.setPostAttachments()
      .then(({ attachments }) => {
        dispatch(loadImageSuccess(attachments));
      })
      .catch(error => dispatch(loadImageFailure(error.message)));
  };
}
