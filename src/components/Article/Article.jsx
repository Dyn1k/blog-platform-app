import React from 'react';
import { Link } from 'react-router-dom';

import { HeartTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';

import TextTruncate from 'react-text-truncate';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';

import { format } from 'date-fns';
/* eslint-disable */
import classes from './Article.module.scss';

const Article = ({
  data: {
    slug,
    title,
    description,
    body,
    favoritesCount,
    tagList,
    updatedAt,
    author: { username, image, following },
  },
  showBody,
}) => {
  const tags = tagList.map((tag, index) => {
    if (tag.trim().length) {
      return (
        <span key={index} className={classes.tag}>
          {tag}
        </span>
      );
    }
  });

  return (
    <article
      className={cn(
        classes.article,
        showBody ? classes['article--full'] : null
      )}
    >
      <div className={classes['article__header-wrapper']}>
        <div className={classes['article__right-column']}>
          <div className={classes['article__title-wrapper']}>
            {showBody ? (
              <h2 className={classes.article__title}>{title}</h2>
            ) : (
              <Link to={`/articles/${slug}`} className={classes.article__title}>
                <TextTruncate
                  line={2}
                  element="span"
                  truncateText=" …"
                  text={title}
                />
              </Link>
            )}

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
          <div className={classes.article__tags}>{tags}</div>
          {showBody ? (
            <p
              className={cn(
                classes.article__description,
                classes['article__description--full']
              )}
            >
              {description}
            </p>
          ) : (
            <p className={classes.article__description}>
              <TextTruncate
                line={7}
                element="span"
                truncateText=" …"
                text={description}
              />
            </p>
          )}
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
      </div>

      {showBody ? (
        <div className={classes.article__body}>
          <ReactMarkdown children={body} />
        </div>
      ) : null}
    </article>
  );
};

export default Article;
