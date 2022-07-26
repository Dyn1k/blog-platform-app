import { configureStore } from '@reduxjs/toolkit';
import articles from './articlesSlice';
import user from './userSlice';

export default configureStore({
  reducer: {
    articles,
    user,
  },
});
