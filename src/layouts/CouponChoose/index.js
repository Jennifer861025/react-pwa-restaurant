import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';

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
        <div className={styles.screenContent}>
          <div className={styles.couponArea}>
            <div className={styles.couponBox}>
              <div className={styles.coupon}>50元折價券</div>
              <div className={styles.useDate}>使用期限：2022/07/10</div>
            </div>
          </div>
          <Button title="使用優惠券"></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default CouponChoose;
