import axios from 'axios';

const API_ROOT = 'https://private-b56f0d-smmaster.apiary-mock.com'; /* temporary emulation of backend */

const isDataExist = data => data !== undefined && data !== null && data !== '';

const isError = data => isDataExist(data) && data.error && data.error.length > 0;

const httpPost = (endPoint, data) => {
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

const httpGet = endPoint => {
  return axios.get(`${API_ROOT}/${endPoint}`).then(response => {
    if (!isDataExist(response.data)) {
      throw new Error('Data is undefined');
    }
    if (isError(response.data)) {
      throw new Error(response.data.error);
    }
    return response.data;
  });
};

export const httpDelete = (endPoint, data) => {
  return axios
    .delete(`${API_ROOT}/${endPoint}`, {
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

export const isAuthUser = user => (user !== undefined && user !== null && Object.prototype.hasOwnProperty.call(user, 'name', 'remoteId'));

export const API = {
  loginRequest: data => httpPost('login_success', data),
  getPosts: () => httpGet('posts'),
  getPostDetails: id => httpPost('post_details', id),
  addPost: data => httpPost('post', data),
  removePost: id => httpDelete(`posts/${id}`, id),
};
