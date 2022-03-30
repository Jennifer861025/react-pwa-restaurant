import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import { getToken } from '../../store/action';

const Home = () => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>首頁</title>
        <meta name="description" content="首頁" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <h1>Restaurant</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
