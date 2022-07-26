import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';
import { useParams } from 'react-router-dom';
import { fetchArticle, unmountingArticle } from '../../store/articlesSlice';
import Article from '../../components/Article';
import Loader from '../../components/Loader';
import classes from './ArticlePage.module.scss';

const ArticlePage = () => {
  const { article, showBody, error, status } = useSelector(
    (state) => state.articles
  );
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(fetchArticle(slug));
    return () => dispatch(unmountingArticle());
  }, [dispatch]);

  const renderArticle = article ? (
    <Article data={article} showBody={showBody} />
  ) : null;

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
      {renderSpinner}
      {renderArticle}
      {renderErrorMessage}
    </div>
  );
};

export default ArticlePage;
