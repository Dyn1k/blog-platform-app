import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../store/articlesSlice';
import Article from '../../components/Article';
import Loader from '../../components/Loader';
import classes from './ArticlePage.module.scss';

const ArticlePage = () => {
  const [article, setArticle] = useState();

  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.articles);
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      const {
        // eslint-disable-next-line no-shadow
        payload: { article },
      } = await dispatch(fetchArticle(slug));
      setArticle(article);
    })();
  }, [dispatch, slug]);

  const renderArticle = article ? <Article {...article} /> : null;

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
      {renderErrorMessage}
      {renderSpinner}
      {renderArticle}
    </div>
  );
};

export default ArticlePage;
