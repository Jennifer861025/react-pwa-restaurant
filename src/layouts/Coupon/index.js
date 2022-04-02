import React, { Fragment, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import { getCoupon } from '../../store/action';
import { StoreContext } from '../../store/reducer';
import Loading from '../../components/Loading';

const Coupon = () => {
  const {
    state: {
      coupon,
      requestdata: { loading },
    },
    dispatch,
  } = useContext(StoreContext);

  const phone = localStorage.getItem('phone');
  const couponLastPage = localStorage.getItem('couponLastPage')
    ? localStorage.getItem('couponLastPage')
    : 'member';

  useEffect(() => {
    getCoupon(dispatch, { phone: phone });
  }, []);

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
              link={couponLastPage == 'feedback' ? path.checkout : path.member}
              linkFlag={true}
            />
            <div className={styles.screenContent}>
              <div className={styles.couponArea}>
                {coupon.length == 0 ? (
                  <>目前尚無優惠券</>
                ) : (
                  coupon.map((coupon) => (
                    <div className={styles.couponBox} key={coupon}>
                      <div className={styles.coupon}>
                        {coupon.couponValue}元折價券
                      </div>
                      <div className={styles.useDate}>
                        使用期限：{coupon.deadline}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default Coupon;
