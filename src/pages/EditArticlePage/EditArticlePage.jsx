import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArticleForm from '../../components/ArticleForm';
import { fetchArticle, updateArticle } from '../../store/articlesSlice';
import Loader from '../../components/Loader';

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const isRender = user && article;

  useEffect(() => {
    const getArticle = async () => {
      const { payload } = await dispatch(fetchArticle(slug));
      setArticle(payload.article);
    };
    getArticle();
  }, [slug]);

  useEffect(() => {
    if (isRender) {
      if (user.username !== article.author.username) {
        navigate('/', { replace: true });
      }
    }
  }, [user, article]);

  return isRender ? (
    <ArticleForm
      article={article}
      action={updateArticle}
      title="Edit article"
    />
  ) : (
    <Loader />
  );
};

export default EditArticlePage;
