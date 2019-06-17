import {
  SET_CURRENT_USER,
  AUTHENTICATION_FAILURE,
} from '@/constants/actionTypes';
import { httpRequests } from '@/helpers/requests';

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
    return httpRequests
      .loginRequest(data)
      .then(response => {
        dispatch(setCurrentUser(response));
        return true;
      })
      .catch(error => {
        dispatch(setUserError(error.message));
        return false;
      });
  };
}
