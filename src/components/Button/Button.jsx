import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ children, className, isLink, to, onClick }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {isLink ? (
      <Link to={to}>
        <button
          onClick={onClick}
          className={`button ${className}`}
          type="button"
        >
          {children}
        </button>
      </Link>
    ) : (
      <button onClick={onClick} className={`button ${className}`} type="button">
        {children}
      </button>
    )}
  </>
);

Button.defaultProps = {
  isLink: null,
  to: null,
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  isLink: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
