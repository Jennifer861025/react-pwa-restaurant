import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
// import path from '../../utils/path';

const MealFinish = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>用餐結束</title>
        <meta name="description" content="用餐結束" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default MealFinish;
