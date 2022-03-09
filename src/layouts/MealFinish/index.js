import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
// import path from '../../utils/path';
import logo from '../../assets/image/logo5.png';
import Button from '../../components/Button';

const MealFinish = () => {
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
          <Button title={'回首頁'}></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default MealFinish;
