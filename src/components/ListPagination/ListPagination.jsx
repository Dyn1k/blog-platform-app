import React from 'react';

import { Pagination } from 'antd';

import './ListPagination.scss';
/* eslint-disable */
const ListPagination = ({ articlesCount, switchPage, page }) => (
  <Pagination
    className="list-pagination"
    size="small"
    pageSize="5"
    showSizeChanger={false}
    total={articlesCount}
    defaultCurrent={1}
    current={page}
    onChange={(page) => switchPage(page)}
  />
);

export default ListPagination;
