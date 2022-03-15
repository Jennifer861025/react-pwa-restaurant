import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import coupon from '../../assets/json/coupon.json';

const CouponChoose = () => {
  const [id, setId] = useState();
  const [value, setValue] = useState();
  const couponChooseHandler = (id, value) => {
    setId(id);
    setValue(value);
  };
  const submitHandler = () => {
    console.log(value);
  };
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
            {coupon.map((coupon) => (
              <button
                key={coupon.id}
                className={
                  id == coupon.id
                    ? `${styles.couponBox} ${styles.couponBox_active}`
                    : styles.couponBox
                }
                onClick={() =>
                  couponChooseHandler(coupon.id, coupon.couponValue)
                }
              >
                <div className={styles.coupon}>
                  {coupon.couponValue}元折價券
                </div>
                <div className={styles.useDate}>
                  使用期限：{coupon.deadline}
                </div>
              </button>
            ))}
          </div>
          <Button title="使用優惠券" onClickHandler={submitHandler}></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default CouponChoose;
