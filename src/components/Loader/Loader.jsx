import React from 'react';

import { SyncOutlined } from '@ant-design/icons';

import classes from './Loader.module.scss';

const Loader = () => (
  <div className={classes.loader__wrapper}>
    <SyncOutlined className={classes.loader} spin />
  </div>
);

export default Loader;
