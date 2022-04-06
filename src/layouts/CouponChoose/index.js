import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import { getCoupon } from '../../store/action';
import { StoreContext } from '../../store/reducer';
import Loading from '../../components/Loading';

const CouponChoose = () => {
  const {
    state: {
      coupon,
      requestdata: { loading },
    },
    dispatch,
  } = useContext(StoreContext);
  const couponLocalStorage = JSON.parse(localStorage.getItem('couponChoose'))
    ? JSON.parse(localStorage.getItem('couponChoose'))
    : null;
  const history = useHistory();
  const phone = localStorage.getItem('phone');
  const [id, setId] = useState(
    couponLocalStorage ? couponLocalStorage.couponId : null,
  );
  const [value, setValue] = useState(
    couponLocalStorage ? couponLocalStorage.couponValue : null,
  );
  const couponChooseHandler = (couponId, value) => {
    if (couponId == id) {
      setId(null);
      setValue(null);
    } else {
      setId(couponId);
      setValue(value);
    }
  };
  const submitHandler = () => {
    history.push(path.checkoutOptions);
  };

  useEffect(() => {
    getCoupon(dispatch, { phone: phone });
  }, []);

  useEffect(() => {
    var couponChoose = { 'couponId': id, 'couponValue': value };
    localStorage.setItem('couponChoose', JSON.stringify(couponChoose));
  }, [id, value]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
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
              <Button
                title="使用優惠券"
                onClickHandler={submitHandler}
              ></Button>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default CouponChoose;
