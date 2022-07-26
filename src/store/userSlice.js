/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/endpoints';

const asyncThunkCreator = (name, request) =>
  createAsyncThunk(name, async (param, { rejectWithValue }) => {
    try {
      const response = await request(param);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        errorMessage: err.message,
        error: err.response.data.errors,
      });
    }
  });

export const registrationUser = asyncThunkCreator(
  'user/registration',
  api.registration
);

export const loginUser = asyncThunkCreator('user/login', api.login);

export const getCurrentUser = asyncThunkCreator(
  'user/getCurrentUser',
  api.getCurrentUser
);

export const updateCurrentUser = asyncThunkCreator(
  'user/updateCurrentUser',
  api.updateCurrentUser
);

const pending = (action) =>
  action.type.endsWith('pending') && action.type.includes('user');

const fulfilled = (action) =>
  action.type.endsWith('fulfilled') && action.type.includes('user');

const rejected = (action) =>
  action.type.endsWith('rejected') && action.type.includes('user');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: null,
    error: null,
  },
  reducers: {
    logOut(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (state.user) {
          localStorage.setItem('token', state.user.token);
          localStorage.setItem('isAuth', 'true');
        }
        state.status = 'resolved';
      })
      .addMatcher(rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) state.error = action.payload;
      });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
