import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import logo from '../../assets/image/logo5.png';
import Button from '../../components/Button';
import { deleteCoupon, setUserTotalPrice } from '../../store/action';

const MealFinish = () => {
  var history = useHistory();
  const phone = localStorage.getItem('phone');
  const historyId = localStorage.getItem('historyId');
  const totalPrice = localStorage.getItem('totalPrice');
  const couponChoose = JSON.parse(localStorage.getItem('couponChoose'))
    ? JSON.parse(localStorage.getItem('couponChoose'))
    : [];
  useEffect(() => {
    if (
      couponChoose.couponId !== undefined ||
      couponChoose.couponId !== null ||
      couponChoose.couponId !== ''
    ) {
      deleteCoupon({ phone: phone, couponId: couponChoose.couponId });
    }
  }, []);

  const btnHandler = () => {
    setUserTotalPrice({
      phone: phone,
      historyId: historyId,
      totalPrice: totalPrice,
    });
    history.push(path.bookingConfirm);
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>用餐結束</title>
        <meta name="description" content="用餐結束" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.incTitle}>XRestaurant 國北店</div>
          <div className={styles.logoArea}>
            <img src={logo}></img>
          </div>
          <div className={styles.thanksMemo}>
            感謝您今日的用餐<br></br>
            歡迎您再度蒞臨本店
          </div>
          <Button title={'回首頁'} onClickHandler={btnHandler}></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default MealFinish;
