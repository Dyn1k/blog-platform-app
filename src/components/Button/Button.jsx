import React from 'react';

import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ children, className }) => (
  <button className={`button ${className}`} type="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
