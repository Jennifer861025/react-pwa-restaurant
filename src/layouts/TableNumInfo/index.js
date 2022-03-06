import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
// import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const TableNumInfo = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>桌號資訊</title>
        <meta name="description" content="桌號資訊" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'桌號資訊'} linkFlag={false} />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default TableNumInfo;
