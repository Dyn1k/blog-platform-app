/* eslint-disable no-param-reassign, no-restricted-syntax, no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from 'antd';
import classes from '../../style/FormStyle.module.scss';
import { updateCurrentUser } from '../../store/userSlice';
import Loader from '../../components/Loader';

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = user ? user.token : '';

  let isServerError = false;
  if (error) isServerError = error.error.username || error.error.email;

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleEditProfile = async (data) => {
    for (const key in data) {
      if (!data[key]) delete data[key];
    }
    const response = await dispatch(
      updateCurrentUser({ user: { ...data, token } })
    );
    if (response.type.endsWith('rejected')) {
      const { username, email } = response.payload.error;
      if (username) {
        setError('username', {
          type: 'server',
          message: `Username ${username}`,
        });
      }
      if (email) {
        setError('email', {
          type: 'server',
          message: `Email ${email}`,
        });
      }
    } else navigate('/', { replace: true });
  };

  const showAnError = (isError) =>
    isError && <div className={classes.form__error}>{isError.message}</div>;

  const showErrorClass = (isError) => isError && classes['form__input--error'];

  return (
    <div className={classes.container}>
      <div className={classes['error-wrapper']}>
        {error && !isServerError && (
          <Alert
            message="An error occurred:"
            showIcon
            description={error.errorMessage}
            type="error"
          />
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleEditProfile)}
        className={classes.form}
        noValidate
      >
        <h2 className={classes.form__title}>Edit Profile</h2>
        <div className={classes['form__label-container']}>
          <label htmlFor="username" className={classes.form__label}>
            Username
            <input
              className={`${classes.form__input} ${showErrorClass(
                errors.username
              )}`}
              name="username"
              type="text"
              placeholder="Username"
              defaultValue={user?.username}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username cannot be longer than 20 characters',
                },
              })}
            />
            {showAnError(errors.username)}
          </label>
          <label htmlFor="email" className={classes.form__label}>
            Email address
            <input
              type="email"
              className={`${classes.form__input} ${showErrorClass(
                errors.email
              )}`}
              name="email"
              placeholder="Email address"
              defaultValue={user?.email}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email',
                },
              })}
            />
            {showAnError(errors.email)}
          </label>
          <label htmlFor="password" className={classes.form__label}>
            New password
            <input
              className={`${classes.form__input} ${showErrorClass(
                errors.password
              )}`}
              type="password"
              autoComplete="off"
              name="password"
              placeholder="New password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password cannot be longer than 40 characters',
                },
              })}
            />
            {showAnError(errors.password)}
          </label>
          <label htmlFor="image" className={classes.form__label}>
            Avatar image (url)
            <input
              className={`${classes.form__input} ${showErrorClass(
                errors.image
              )}`}
              name="image"
              placeholder="Avatar image"
              {...register('image', {
                pattern: {
                  value:
                    /[-a-zA-Z0-9@:%_+.~#?&\\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&\\/=]*)?/gi,
                  message: 'Invalid url',
                },
              })}
            />
            {showAnError(errors.image)}
          </label>
        </div>
        <Button
          className={classes.form__button}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>

        <div style={{ marginTop: '12px' }}>
          {status === 'loading' && <Loader />}
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
