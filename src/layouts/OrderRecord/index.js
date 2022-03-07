import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const OrderRecord = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>點餐記錄</title>
        <meta name="description" content="點餐記錄" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'點餐記錄'} link={path.order} linkFlag={true} />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default OrderRecord;
