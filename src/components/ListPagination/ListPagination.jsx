/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../store/articlesSlice';

import { Pagination } from 'antd';

import './ListPagination.scss';

const ListPagination = () => {
  const dispatch = useDispatch();

  const { articlesCount, page } = useSelector((state) => state.articles);

  return (
    <>
      <Pagination
        className="list-pagination"
        size="small"
        pageSize="5"
        showSizeChanger={false}
        total={articlesCount}
        current={page}
        onChange={(page) => {
          dispatch(setPage({ page }));
        }}
      />
    </>
  );
};

export default ListPagination;
