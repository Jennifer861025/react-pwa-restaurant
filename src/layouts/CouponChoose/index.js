import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const CouponChoose = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>優惠券</title>
        <meta name="description" content="優惠券" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'優惠券'}
          link={path.checkoutOptions}
          linkFlag={true}
        />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default CouponChoose;
