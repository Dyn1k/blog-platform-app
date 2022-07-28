import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useClickAway } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteArticle } from '../../store/articlesSlice';
import Caution from './caution.svg';
import classes from './Popconfirm.module.scss';

const Popconfirm = ({ setPopconfirm }) => {
  const dispatch = useDispatch();
  const popRef = useRef();
  const navigate = useNavigate();
  const { slug } = useParams();

  useClickAway(popRef, (e) => {
    if (!(e.target.id === 'close-button')) {
      setPopconfirm(false);
    }
  });

  const handleDeleteArticle = async () => {
    const response = await dispatch(deleteArticle(slug));
    if (!response.error) navigate('/', { replace: true });
  };

  return (
    <div className={classes.popconfirm} ref={popRef}>
      <div className={classes.arrow} />

      <div className={classes['text-wrapper']}>
        <img className={classes.img} src={Caution} alt="Caution" />
        <span className={classes.text}>
          Are you sure to delete this article?
        </span>
      </div>
      <div className={classes.buttons}>
        <button
          onClick={() => setPopconfirm(false)}
          className={classes.button}
          type="button"
        >
          No
        </button>
        <button
          onClick={handleDeleteArticle}
          className={classes.button}
          type="button"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

Popconfirm.propTypes = {
  setPopconfirm: PropTypes.func.isRequired,
};

export default Popconfirm;
