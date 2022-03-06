import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const NoReserved = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>登記候位</title>
        <meta name="description" content="登記候位" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'登記候位'}
          link={path.bookingConfirm}
          linkFlag={true}
        />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default NoReserved;
