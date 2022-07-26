/* eslint-disable no-param-reassign, no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/endpoints';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (offset, { rejectWithValue }) => {
    try {
      const response = await api.fetchArticles(offset);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.fetchArticle(slug);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    showBody: false,
    article: null,
    page: 1,
    articlesCount: null,
    status: null,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload.page;
    },
    unmountingArticle(state) {
      state.article = null;
      state.showBody = false;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.article = action.payload.article;
      state.showBody = true;
      state.articles = [];
      state.articlesCount = null;
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { unmountingArticle, setPage } = articlesSlice.actions;

export default articlesSlice.reducer;
