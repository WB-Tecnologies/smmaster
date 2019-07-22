import {
  SET_CURRENT_USER,
  AUTHENTICATION_FAILURE,
} from '@/constants/actionTypes';
import { API } from '@/helpers/requests';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: { user },
});

export const setUserError = error => ({
  type: AUTHENTICATION_FAILURE,
  payload: { error },
});

export function authAction(data) {
  return dispatch => {
    return API.loginRequest(data)
      .then(response => {
        dispatch(setCurrentUser(response));
      })
      .catch(error => {
        dispatch(setUserError(error.message));
      });
  };
}
