import React from 'react';

import Button from '../Button';

import classes from './Header.module.scss';

const Header = () => (
  <header className={classes.header}>
    <div className={classes.header__container}>
      <h1 className={classes.header__title}>Realworld Blog</h1>
      <div className={classes['header__button-group']}>
        <Button className="without-border">Sign In</Button>
        <Button className="green">Sign Up</Button>
      </div>
    </div>
  </header>
);

export default Header;
