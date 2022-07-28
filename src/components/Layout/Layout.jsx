import React from 'react';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';
import Header from '../Header';

const Layout = () => (
  <>
    <Header />
    <main className={classes.main}>
      <Outlet />
    </main>
  </>
);

export default Layout;
