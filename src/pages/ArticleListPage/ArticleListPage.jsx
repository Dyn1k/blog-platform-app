import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'antd';

import { fetchArticles } from '../../store/articlesSlice';

/* eslint-disable */
import Article from '../../components/Article';
import ListPagination from '../../components/ListPagination';
import Loader from '../../components/Loader';

import classes from './ArticleListPage.module.scss';

const ArticleListPage = () => {
  const dispatch = useDispatch();
  const { status, error, articles, showBody, page } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticles((page - 1) * 5));
  }, [dispatch, page]);

  const renderArticles = articles.length
    ? articles.map((article) => (
        <Article key={article.slug} data={article} showBody={showBody} />
      ))
    : null;

  const renderPagination = articles.length ? <ListPagination /> : null;

  const renderErrorMessage = error && (
    <Alert
      message="An error occurred:"
      showIcon
      description={error}
      type="error"
    />
  );

  const renderSpinner = status === 'loading' && <Loader />;

  return (
    <div className={classes.container}>
      <div className={classes['article-list']}>
        {renderSpinner}
        {renderErrorMessage}
        {renderArticles}
        {renderPagination}
      </div>
    </div>
  );
};

export default ArticleListPage;
