import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';

const NoReserved = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>未訂位-1</title>
        <meta name="description" content="未訂位-1" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.questionTitle}>請輸入電話號碼</div>
        </div>
      </div>
    </Fragment>
  );
};
export default NoReserved;
