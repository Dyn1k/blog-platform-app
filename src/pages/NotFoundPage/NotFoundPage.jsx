import React from 'react';
import { QuestionOutlined } from '@ant-design/icons';
import classes from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <div className={classes['not-found']}>
    <QuestionOutlined className={classes.animation} />
    <div className={classes.text}>Oops... Page not found!</div>
    <QuestionOutlined className={classes.animation} />
  </div>
);

export default NotFoundPage;
