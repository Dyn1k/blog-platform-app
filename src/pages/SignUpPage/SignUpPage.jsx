import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { registrationUser } from '../../store/userSlice';
import Loader from '../../components/Loader';
import classes from '../../style/FormStyle.module.scss';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.user);

  let isServerError = false;
  if (error) isServerError = error.error.username || error.error.email;

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleRegistration = async (data) => {
    const { username, email, password } = data;
    const response = await dispatch(
      registrationUser({ user: { username, email, password } })
    );
    if (response.type.endsWith('rejected')) {
      // eslint-disable-next-line no-shadow
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
        onSubmit={handleSubmit(handleRegistration)}
        className={classes.form}
        noValidate
      >
        <h2 className={classes.form__title}>Create new account</h2>
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
              className={`${classes.form__input} ${showErrorClass(
                errors.email
              )}`}
              name="email"
              type="email"
              placeholder="Email address"
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
            Password
            <input
              className={`${classes.form__input} ${showErrorClass(
                errors.password
              )}`}
              type="password"
              name="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
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
          <label htmlFor="repeat-password" className={classes.form__label}>
            Repeat Password
            <input
              type="password"
              className={`${classes.form__input} ${showErrorClass(
                errors['repeat-password']
              )}`}
              name="repeat-password"
              placeholder="Password"
              {...register('repeat-password', {
                required: 'Repeat password field is required',
                validate: {
                  checkPasswordMatches: (value) => {
                    const { password } = getValues();
                    return password === value || 'Passwords must match';
                  },
                },
              })}
            />
            {showAnError(errors['repeat-password'])}
          </label>
        </div>
        <hr className={classes.form__hr} />
        <label className={classes.form__checkbox} htmlFor="agreement">
          <label htmlFor="agreement" className={classes.checkbox}>
            <input
              name="agreement"
              id="agreement"
              type="checkbox"
              {...register('agreement', {
                required: 'You must agree to the terms',
              })}
            />
            <span />
          </label>
          <span className={classes['form__checkbox-span']}>
            I agree to the processing of my personal information
          </span>
        </label>
        {showAnError(errors.agreement)}
        <Button
          className={classes.form__button}
          type="primary"
          htmlType="submit"
        >
          Create
        </Button>
        <div className={classes.form__link}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </div>
        {status === 'loading' && <Loader />}
      </form>
    </div>
  );
};

export default SignUpPage;
