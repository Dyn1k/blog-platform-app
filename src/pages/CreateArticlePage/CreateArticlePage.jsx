import React from 'react';
import ArticleForm from '../../components/ArticleForm';
import { createNewArticle } from '../../store/articlesSlice';

const CreateArticlePage = () => (
  <ArticleForm action={createNewArticle} title="Create New Article" />
);

export default CreateArticlePage;
