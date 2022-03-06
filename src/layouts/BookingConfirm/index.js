import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import logo from '../../assets/image/logo5.png';
import path from '../../utils/path';

const BookingConfirm = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>確認是否訂位</title>
        <meta name="description" content="確認是否訂位" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.incTitle}>XRestaurant 國北店</div>
          <div className={styles.imgArea}>
            <img src={logo}></img>
          </div>
          <div className={styles.questionTitle}>今日是否有訂位？</div>
          <div className={styles.buttonArea}>
            <Link to={path.reservationInfo} className={styles.button}>
              已訂位
            </Link>
            <Link to={path.noReserved} className={styles.button}>
              現場候位
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingConfirm;
