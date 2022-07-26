import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCurrentUser } from '../../store/userSlice';
import 'antd/dist/antd.min.css';
import './App.module.scss';
import ArticleList from '../../pages/ArticleListPage';
import Layout from '../Layout';
import ArticlePage from '../../pages/ArticlePage';
import SignUpPage from '../../pages/SignUpPage';
import SignInPage from '../../pages/SignInPage';
import Authorized from '../../hoc/Authorized';
import EditProfilePage from '../../pages/EditProfilePage';
import NotAuthorized from '../../hoc/NotAuthorized';
import NotFoundPage from '../../pages/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route
          path="/sign-up"
          element={
            <Authorized>
              <SignUpPage />
            </Authorized>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Authorized>
              <SignInPage />
            </Authorized>
          }
        />
        <Route
          path="/profile"
          element={
            <NotAuthorized>
              <EditProfilePage />
            </NotAuthorized>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
