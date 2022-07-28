import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from 'antd';
import { loginUser } from '../../store/userSlice';
import Loader from '../../components/Loader';
import classes from '../../style/FormStyle.module.scss';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.user);

  let isServerError = false;
  if (error) isServerError = !!error.error['email or password'];

  const {
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const response = await dispatch(loginUser({ user: { email, password } }));
    if (response.type.endsWith('rejected')) {
      const emailOrPass = response.payload.error['email or password'];
      if (emailOrPass) {
        setError('password', {
          type: 'server',
          message: `Email or password ${emailOrPass}`,
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
        onSubmit={handleSubmit(handleLogin)}
        className={classes.form}
        noValidate
      >
        <h2 className={classes.form__title}>Sign In</h2>
        <div className={classes['form__label-container']}>
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
              })}
            />
            {showAnError(errors.password)}
          </label>
        </div>
        <Button
          className={classes.form__button}
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
        <div className={classes.form__link}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </div>
        {status === 'loading' && <Loader />}
      </form>
    </div>
  );
};

export default SignInPage;
