import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
/* eslint-disable */
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://blog.kata.academy/api/arrticles?limit=5'
      );

      return response.data;
    } catch (err) {
      console.log(err);

      return rejectWithValue(err.message);
    }
  }
);

const blogPlatformSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload.articles;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default blogPlatformSlice.reducer;
