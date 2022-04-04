import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
// import { getUser } from '../../store/action';

const Checkout = () => {
  const history = useHistory();

  const feedbackFinish = localStorage.getItem('feedbackFinish')
    ? JSON.parse(localStorage.getItem('feedbackFinish'))
    : false;

  const reservationData = localStorage.getItem('reservationData')
    ? JSON.parse(localStorage.getItem('reservationData'))
    : { 'peopleNum': 0 };

  const pricePlan = Number(localStorage.getItem('pricePlan'));

  const couponValue = localStorage.getItem('couponChoose')
    ? JSON.parse(localStorage.getItem('couponChoose')).couponValue
    : 0;

  const totalPrice = reservationData.peopleNum * pricePlan - couponValue;

  const feedbackBtnHandler = () => {
    history.push(path.feedback);
  };

  useEffect(() => {
    console.log(feedbackFinish);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>用餐結帳</title>
        <meta name="description" content="用餐結帳" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'用餐結帳'} link={path.menu} linkFlag={false} />
        <TabBar checkout={true} />
        <div className={styles.screenContent}>
          <div className={styles.incTitle}>XRestaurant 國北店</div>
          <div className={styles.checkDetail}>
            <div className={styles.checkDetail_peopleNum}>
              今日用餐人數：{reservationData.peopleNum}人
            </div>
            <div className={styles.checkDetail_pricePlan}>
              選擇的方案：{pricePlan}方案
            </div>
            <div className={styles.checkDetail_moneyArea}>
              <div>消費金額：</div>
              <div
                className={couponValue == 0 ? styles.money : styles.money_red}
              >
                {totalPrice}元
              </div>
              <div
                className={
                  couponValue == 0
                    ? styles.couponFinish_hide
                    : styles.couponFinish
                }
              >
                已折扣
              </div>
            </div>
            <div className={styles.checkDetail_couponMemo}>
              幫助我們填寫用餐意見回饋<br></br>問卷，可享有優惠好禮！
            </div>
            {/* <Link to={path.feedback} className={styles.button}> */}
            <button
              className={
                feedbackFinish
                  ? `${styles.button} ${styles.button_disabled}`
                  : styles.button
              }
              onClick={feedbackBtnHandler}
              disabled={feedbackFinish ? 'disabled' : ''}
            >
              {feedbackFinish ? '問卷已填寫' : '填寫問卷'}
            </button>
            <Link to={path.checkoutOptions}>
              <Button title={'結帳'} main={false}></Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Checkout;
