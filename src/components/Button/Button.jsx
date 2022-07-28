import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, className, isLink, to, onClick, id }) =>
  isLink ? (
    <Link to={to}>
      <button
        onClick={onClick}
        className={`button ${className}`}
        id={id}
        type="button"
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`button ${className}`}
      id={id}
      type="button"
    >
      {children}
    </button>
  );

Button.defaultProps = {
  isLink: null,
  to: null,
  onClick: () => {},
  id: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  isLink: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default Button;
