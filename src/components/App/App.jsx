import React from 'react';

import 'antd/dist/antd.min.css';

import classes from './App.module.scss';
import Header from '../Header';
import ArticleList from '../ArticleList/ArticleList';

const App = () => (
  <>
    <Header />
    <main className={classes.main}>
      <ArticleList />
    </main>
  </>
);

export default App;
