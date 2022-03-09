import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';

const Checkout = () => {
  useEffect(() => {
    localStorage.setItem('feedbackFinish', false);
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
              今日用餐人數：3人
            </div>
            <div className={styles.checkDetail_moneyArea}>
              <div>消費金額：</div>
              <div className={styles.money}>1497元</div>
            </div>
            <div className={styles.checkDetail_couponMemo}>
              幫助我們填寫用餐意見回饋<br></br>問卷，可享有優惠好禮！
            </div>
            <Link to={path.feedback} className={styles.button}>
              <Button title={'填寫問卷'} main={false}></Button>
            </Link>
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
