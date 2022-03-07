import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';

const Checkout = () => {
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
            <div>今日用餐人數：3人</div>
            <div>消費金額：1497元</div>
            <div>
              幫助我們填寫用餐意見回饋<br></br>問卷，可享有優惠好禮！
            </div>
            <Button title={'填寫問卷'} main={false}></Button>
            <Button title={'結帳'} main={false}></Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Checkout;
