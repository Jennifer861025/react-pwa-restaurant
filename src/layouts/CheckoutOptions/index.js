import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';

const CheckoutOptions = () => {
  var priceInit = 1497;
  var feedbackFinish = localStorage.getItem('feedbackFinish');
  var price = JSON.parse(feedbackFinish) ? priceInit - 100 : priceInit;

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>結帳選擇</title>
        <meta name="description" content="結帳選擇" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'結帳選擇'}
          link={path.checkout}
          linkFlag={JSON.parse(feedbackFinish) ? false : true}
        />
        <div className={styles.screenContent}>
          <div className={styles.moneyArea}>
            <div>消費金額：</div>
            <div className={styles.money}>{price}元</div>
          </div>
          <Link to={path.couponChoose}>
            <Button title={'使用優惠券'}></Button>
          </Link>
          <div className={styles.checkoutOption_memo}>請選擇付費方式：</div>
          <Link to={path.mealFinish}>
            <Button title={'Line Pay'}></Button>
          </Link>
          <Link to={path.mealFinish} className={styles.button}>
            <Button title={'Apple Pay'}></Button>
          </Link>
          <Link to={path.mealFinish} className={styles.button}>
            <Button title={'街口支付'}></Button>
          </Link>
          <Link to={path.mealFinish} className={styles.button}>
            <Button title={'臨櫃結帳'}></Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default CheckoutOptions;
