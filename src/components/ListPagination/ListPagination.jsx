import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { setPage } from '../../store/articlesSlice';
import './ListPagination.scss';

const ListPagination = () => {
  const dispatch = useDispatch();

  const { articlesCount, page } = useSelector((state) => state.articles);

  return (
    <Pagination
      className="list-pagination"
      size="small"
      pageSize="5"
      showSizeChanger={false}
      total={articlesCount}
      current={page}
      /* eslint-disable-next-line no-shadow */
      onChange={(page) => {
        dispatch(setPage({ page }));
      }}
    />
  );
};

export default ListPagination;
