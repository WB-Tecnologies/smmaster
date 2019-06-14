import axios from 'axios';

const API_ROOT = 'https://private-1899c-elena131.apiary-mock.com'; /* temporary emulation of backend */

const isDataExist = data => data !== undefined && data !== null && data !== '';

const isError = data => isDataExist(data) && data.error && data.error.length > 0;

export const httpPost = (endPoint, data) => {
  return axios
    .post(`${API_ROOT}/${endPoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    })
    .then(response => {
      if (!isDataExist(response.data)) {
        throw new Error('Data is undefined');
      }
      if (isError(response.data)) {
        throw new Error(response.data.error);
      }
      return response.data;
    });
};

export const isAuthUser = user =>
  user !== undefined &&
  user !== null &&
  Object.prototype.hasOwnProperty.call(user, 'name', 'remoteId');

export const httpRequests = {
  loginRequest: data => httpPost('login_success', data),
};
