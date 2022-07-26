import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Authorized = ({ children }) => {
  const isAuth = localStorage.getItem('isAuth');

  if (isAuth) return <Navigate to="/" replace />;
  return children;
};

Authorized.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Authorized;
