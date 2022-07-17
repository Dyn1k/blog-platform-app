import React from 'react';

import { HeartTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';

import { format } from 'date-fns';
/* eslint-disable */
import classes from './Article.module.scss';

const Article = ({
  data: {
    title,
    description,
    favoritesCount,
    tagList,
    updatedAt,
    author: { username, image, following },
  },
}) => (
  <article className={classes.article}>
    <div className={classes['article__preview-wrapper']}>
      <div className={classes['article__title-wrapper']}>
        <h3 className={classes.article__title}>{title}</h3>
        <div className={classes.article__likes}>
          <HeartTwoTone
            className={classes.article__like}
            twoToneColor="#808080"
          />
          <span className={classes['article__likes-counter']}>
            {favoritesCount}
          </span>
        </div>
      </div>
      <div className={classes.article__tags}>
        {tagList.map((tag, index) => (
          <span key={index} className={classes.tag}>
            {tag}
          </span>
        ))}
      </div>
      <p className={classes.article__description}>{description}</p>
    </div>
    <div className={classes.avatar}>
      <div className={classes['avatar__left-column']}>
        <span className={classes.avatar__name}>{username}</span>
        <span className={classes.avatar__date}>
          {format(new Date(updatedAt), "MMMMMM d',' Y")}
        </span>
      </div>
      <Avatar size={46} src={image} />
    </div>
  </article>
);

export default Article;
