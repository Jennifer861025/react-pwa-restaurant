import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';

function Home() {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>首頁</title>
        <meta name="description" content="首頁" />
      </Helmet>
      <div className={styles.screen}>
        <h1>good morning</h1>
      </div>
    </Fragment>
  );
}

export default Home;
