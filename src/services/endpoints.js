import axios from './api';

const endpoints = {
  fetchArticles: (offset) => axios.get(`/articles?limit=5&offset=${offset}`),
  fetchArticle: (slug) => axios.get(`/articles/${slug}`),
  registration: (data) => axios.post('/users', data),
  login: (data) => axios.post('/users/login', data),
  getCurrentUser: () => axios.get('user'),
  updateCurrentUser: (data) => axios.put('user', data),
};

export default endpoints;
