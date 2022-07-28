import axios from './api';

const articlesEndpoints = {
  fetchArticles: (offset) => axios.get(`/articles?limit=5&offset=${offset}`),
  fetchArticle: (slug) => axios.get(`/articles/${slug}`),
  createNewArticle: (data) => axios.post('/articles', data),
  updateArticle: (data) => axios.put(`/articles/${data.article.slug}`, data),
  deleteArticle: (slug) => axios.delete(`/articles/${slug}`),
  favoriteArticle: (slug) => axios.post(`/articles/${slug}/favorite`),
  unFavoriteArticle: (slug) => axios.delete(`/articles/${slug}/favorite`),
};

export default articlesEndpoints;
