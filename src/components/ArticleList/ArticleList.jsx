import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../../store/blogPlatformSlice';
/* eslint-disable */
import classes from './ArticleList.module.scss';
import Article from '../Article';
import ListPagination from '../ListPagination';

const ArticleList = () => {
  const dispatch = useDispatch();
  // const articles = useSelector((state) => state.articles.articles);
  const { status, error } = useSelector((state) => state.articles);

  const [articlesCount, setArticlesCount] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // const switchPage = (page) => {
  //   axios
  //     .get(
  //       `https://blog.kata.academy/api/articles?offset=${
  //         (page - 1) * 5
  //       }&limit=5`
  //     )
  //     .then((response) => {
  //       setArticlesCount(response.data.articlesCount);
  //       setArticles(response.data.articles);
  //       setPage(page);
  //     });
  // };

  return (
    <div className={classes['article-list']}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {status}
      {/*{articles.length*/}
      {/*  ? articles.map((article) => (*/}
      {/*      <Article key={article.slug} data={article} />*/}
      {/*    ))*/}
      {/*  : null}*/}
      {/*{articles.length && (*/}
      {/*  <ListPagination*/}
      {/*    switchPage={switchPage}*/}
      {/*    articlesCount={articlesCount}*/}
      {/*    page={page}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default ArticleList;
