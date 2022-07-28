import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';
import TextTruncate from 'react-text-truncate';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';
import { format } from 'date-fns';
import classes from './Article.module.scss';
import Button from '../Button';
import Popconfirm from '../Popconfirm';
import {
  favoriteArticle,
  unFavoriteArticle,
  makeArticleFavorite,
} from '../../store/articlesSlice';

const Article = ({
  slug,
  title,
  description,
  body,
  favoritesCount,
  favorited,
  tagList,
  updatedAt,
  author: { username, image },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { favoritesCount: favCount, favorited: isFavorited } = useSelector(
    (state) => state.articles.entities[slug]
  );
  const [isPopconfirm, setPopconfirm] = useState(false);

  const showBody = location.pathname.includes(slug);
  const isOwnArticle = username === user?.username;
  const isAuth = !!user;
  const likesCount = showBody ? favCount : favoritesCount;
  const favoritedByMe = showBody ? isFavorited : favorited;

  const onFavoriteClickHandler = async () => {
    if (isAuth) {
      if (favoritedByMe) {
        const { payload } = await dispatch(unFavoriteArticle(slug));
        if (payload.article) {
          dispatch(makeArticleFavorite(payload.article));
        }
      } else {
        const { payload } = await dispatch(favoriteArticle(slug));
        if (payload.article) {
          dispatch(makeArticleFavorite(payload.article));
        }
      }
    }
  };

  const renderTags = tagList
    .filter((tag) => tag)
    .map((tag) =>
      showBody ? (
        <span className={classes.tag}>{tag}</span>
      ) : (
        <span className={cn(classes.tag, classes['tag--preview'])}>{tag}</span>
      )
    );

  const renderArticle = showBody ? (
    <h2 className={classes.article__title}>{title}</h2>
  ) : (
    <Link to={`/articles/${slug}`} className={classes.article__title}>
      <TextTruncate line={2} element="span" truncateText=" …" text={title} />
    </Link>
  );

  const renderDescription = showBody ? (
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
  );

  const renderBody = showBody ? (
    <div className={classes.article__body}>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  ) : null;

  // eslint-disable-next-line no-nested-ternary
  const likeColor = !isAuth ? '#808080' : favoritedByMe ? '#FF0000' : '#BBBBBB';

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
            {renderArticle}
            <div className={classes.article__likes}>
              <HeartTwoTone
                onClick={onFavoriteClickHandler}
                className={classes.article__like}
                twoToneColor={likeColor}
              />
              <span className={classes['article__likes-counter']}>
                {likesCount}
              </span>
            </div>
          </div>
          <div className={classes.article__tags}>{renderTags}</div>
          {renderDescription}
        </div>
        <div className={classes.avatar}>
          <div className={classes['avatar__top-row']}>
            <div className={classes['avatar__text-wrapper']}>
              <span className={classes.avatar__name}>{username}</span>
              <span className={classes.avatar__date}>
                {format(new Date(updatedAt), "MMMMMM d',' Y")}
              </span>
            </div>
            <Avatar size={46} src={image} />
          </div>
          {showBody && isOwnArticle && user && (
            <div className={classes['avatar__bottom-row']}>
              <Button
                onClick={() => setPopconfirm(!isPopconfirm)}
                className="article-page red"
                id="close-button"
              >
                Delete
              </Button>
              {isPopconfirm ? (
                <Popconfirm setPopconfirm={setPopconfirm} />
              ) : null}
              <Button
                onClick={() =>
                  navigate(`/articles/${slug}/edit`, { state: slug })
                }
                className="article-page green"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
      {renderBody}
    </article>
  );
};

Article.defaultProps = {
  title: '',
  description: '',
  body: '',
  tagList: [],
  author: {
    image: '',
  },
};

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  favoritesCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string),
  updatedAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
};

export default Article;
