import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, Button as AntdButton } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import PropTypes, { shape } from 'prop-types';
import Button from '../Button';
import classes from '../../style/FormStyle.module.scss';

const ArticleForm = ({ action, title, article }) => {
  const [tags, setTags] = useState([{ id: uuidv4(), text: '' }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.articles);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (article) {
      const tgs = article?.tagList.map((tag) => ({ id: uuidv4(), text: tag }));
      setTags(tgs);
    }
  }, [article]);

  const handleSend = async (data) => {
    const tagList = tags
      .filter((tag) => tag.text.trim())
      .map((tag) => tag.text.trim());

    // eslint-disable-next-line no-shadow
    const { title, description, body } = data;
    const newData = { title, description, body, tagList };
    if (article?.slug) newData.slug = article?.slug;

    const response = await dispatch(
      action({
        article: newData,
      })
    );

    if (!response.type.endsWith('rejected'))
      navigate(`/articles/${response.payload.article.slug}`, { replace: true });
  };

  const onDeleteTag = (id) => setTags(tags.filter((tag) => tag.id !== id));

  const onAddTag = () => setTags([...tags, { id: uuidv4(), text: '' }]);

  const renderTagButton = (id) =>
    tags.length === 1 ? (
      <Button onClick={onAddTag} className="article-form blue">
        Add tag
      </Button>
    ) : (
      <Button onClick={() => onDeleteTag(id)} className="article-form red">
        Delete
      </Button>
    );

  const checkLastTag = (id) => {
    if (tags.length !== 1 && id === tags[tags.length - 1].id) {
      return (
        <Button onClick={onAddTag} className="article-form blue">
          Add tag
        </Button>
      );
    }
    return null;
  };

  const onChangeTag = (e, id) => {
    const newArray = tags.map((tag) =>
      tag.id === id ? { ...tag, text: e.target.value } : tag
    );
    setTags(newArray);
  };

  const showAnError = (isError) =>
    isError && <div className={classes.form__error}>{isError.message}</div>;

  const showErrorClass = (isError) => isError && classes['form__input--error'];

  return (
    <div className={classes.container}>
      <div className={classes['error-wrapper']}>
        {error && (
          <Alert
            message="An error occurred:"
            showIcon
            description={error}
            type="error"
          />
        )}
      </div>
      <form
        className={`${classes.form} ${classes['form--article']}`}
        onSubmit={handleSubmit(handleSend)}
        noValidate
      >
        <h2 className={classes.form__title}>{title}</h2>
        <div
          className={`${classes['form__label-container']} ${classes['form__label-container--article']}`}
        >
          <label htmlFor="title" className={classes.form__label}>
            Title
            <input
              className={`${classes.form__input} ${showErrorClass(
                errors.title
              )}`}
              name="title"
              type="text"
              placeholder="Title"
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 200,
                  message: 'Title cannot be longer than 300 characters',
                },
              })}
              defaultValue={article?.title}
            />
            {showAnError(errors.title)}
          </label>
          <label htmlFor="description" className={classes.form__label}>
            Short description
            <input
              className={`${classes.form__input} ${showErrorClass(
                errors.description
              )}`}
              name="description"
              type="text"
              placeholder="Short description"
              defaultValue={article?.description}
              {...register('description', {
                required: 'Description is required',
                maxLength: {
                  value: 700,
                  message: 'Description cannot be longer than 1000 characters',
                },
              })}
            />
            {showAnError(errors.description)}
          </label>
          <label htmlFor="text" className={classes.form__label}>
            Text
            <textarea
              className={`${classes.form__input} ${
                classes['form__input--article']
              } ${showErrorClass(errors.body)}`}
              placeholder="Text"
              defaultValue={article?.body}
              {...register('body', {
                required: 'Text is required',
              })}
            />
            {showAnError(errors.body)}
          </label>
          <label htmlFor="text" className={classes.form__label}>
            Tags
            <div className={classes['form__input-group']}>
              {tags.map((tag) => (
                <div key={tag.id} className={classes['form__tag-wrapper']}>
                  <input
                    placeholder="Tag"
                    className={`${classes.form__input} ${showErrorClass(
                      errors[tag.id]
                    )}`}
                    value={tag.text}
                    {...register(`${tag.id}`, {
                      maxLength: {
                        value: 50,
                        message: 'Tag cannot be longer than 50 characters',
                      },
                      onChange: (e) => onChangeTag(e, tag.id),
                    })}
                  />
                  {renderTagButton(tag.id)}
                  {checkLastTag(tag.id)}
                  {showAnError(errors[tag.id])}
                </div>
              ))}
            </div>
          </label>
        </div>
        <AntdButton
          className={`${classes.form__button} ${classes['form__button--article']}`}
          type="primary"
          htmlType="submit"
        >
          Send
        </AntdButton>
      </form>
    </div>
  );
};

ArticleForm.defaultProps = {
  article: null,
};

ArticleForm.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  article: shape({
    tagList: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default ArticleForm;
