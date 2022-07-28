/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import api from '../services/articlesEndpoints';

const asyncThunkCreator = (name, request) =>
  createAsyncThunk(name, async (param, { rejectWithValue }) => {
    try {
      const response = await request(param);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  });

export const fetchArticles = asyncThunkCreator(
  'articles/fetchArticles',
  api.fetchArticles
);

export const fetchArticle = asyncThunkCreator(
  'articles/fetchArticle',
  api.fetchArticle
);

export const createNewArticle = asyncThunkCreator(
  'articles/createNewArticle',
  api.createNewArticle
);

export const updateArticle = asyncThunkCreator(
  'articles/updateArticle',
  api.updateArticle
);

export const deleteArticle = asyncThunkCreator(
  'articles/deleteArticle',
  api.deleteArticle
);

export const favoriteArticle = asyncThunkCreator(
  'articles/favoriteArticle',
  api.favoriteArticle
);

export const unFavoriteArticle = asyncThunkCreator(
  'articles/unFavoriteArticle',
  api.unFavoriteArticle
);

const pending = (action) =>
  action.type.endsWith('pending') &&
  action.type.includes('articles') &&
  !action.type.includes('favoriteArticle') &&
  !action.type.includes('unFavoriteArticle');

function error(action) {
  return action.type.endsWith('rejected') && action.type.includes('articles');
}

const articlesAdapter = createEntityAdapter({
  selectId: (article) => article.slug,
});

const initialState = articlesAdapter.getInitialState({
  page: 1,
  articlesCount: null,
  status: null,
  error: null,
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload.page;
    },
    makeArticleFavorite: articlesAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        articlesAdapter.setAll(state, action.payload.articles);
        state.articlesCount = action.payload.articlesCount;
        state.status = 'resolved';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        articlesAdapter.setAll(state, action.payload);
        state.status = 'resolver';
      })
      .addMatcher(pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(error, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { setPage, makeArticleFavorite } = articlesSlice.actions;

export const { selectAll: selectArticles, selectById: selectArticle } =
  articlesAdapter.getSelectors((state) => state.articles);

export default articlesSlice.reducer;
