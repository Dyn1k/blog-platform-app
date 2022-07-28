import axios from './api';

const userEndpoints = {
  registration: (data) => axios.post('/users', data),
  login: (data) => axios.post('/users/login', data),
  getCurrentUser: () => axios.get('user'),
  updateCurrentUser: (data) => axios.put('user', data),
};

export default userEndpoints;
