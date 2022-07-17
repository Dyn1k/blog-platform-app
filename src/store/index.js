import { configureStore } from '@reduxjs/toolkit';
import articles from './blogPlatformSlice';

export default configureStore({
  reducer: {
    articles,
  },
});
