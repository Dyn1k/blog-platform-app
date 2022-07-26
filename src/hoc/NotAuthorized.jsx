import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotAuthorized = ({ children }) => {
  const isAuth = localStorage.getItem('isAuth');
  const location = useLocation();

  if (isAuth) return children;
  return <Navigate to="/sign-in" state={{ from: location }} />;
};

NotAuthorized.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default NotAuthorized;
