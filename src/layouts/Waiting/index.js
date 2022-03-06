import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
// import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const Waiting = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>等候叫號</title>
        <meta name="description" content="等候叫號" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'等候叫號'} linkFlag={false} />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default Waiting;
