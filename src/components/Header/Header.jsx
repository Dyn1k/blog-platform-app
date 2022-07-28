import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { logOut } from '../../store/userSlice';
import { setPage } from '../../store/articlesSlice';
import Button from '../Button';
import UserAvatar from './avatar.jpg';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userAvatar = user?.image ? user.image : UserAvatar;

  const assignHomePage = () => dispatch(setPage({ page: 1 }));

  const notAuthorized = (
    <>
      <Button isLink to="/sign-in" className="without-border">
        Sign In
      </Button>
      <Button isLink to="/sign-up" className="green">
        Sign Up
      </Button>
    </>
  );

  const authorized = (
    <>
      <Button isLink to="/new-article" className="green create-article">
        Create article
      </Button>
      <Button isLink to="/profile" className="avatar">
        {user?.username}
        <Avatar src={userAvatar} size={46} />
      </Button>
      <Button
        isLink
        to="/"
        className="black"
        onClick={() => dispatch(logOut())}
      >
        Log Out
      </Button>
    </>
  );

  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <Link
          to="/"
          style={{ color: '#000000' }}
          className={classes.header__title}
          onClick={assignHomePage}
        >
          Realworld Blog
        </Link>
        <div className={classes['header__button-group']}>
          {user ? authorized : notAuthorized}
        </div>
      </div>
    </header>
  );
};

export default Header;
