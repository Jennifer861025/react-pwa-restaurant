import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
import logo from '../../assets/image/logo5.png';

const Member = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>會員</title>
        <meta name="description" content="會員" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'會員'} linkFlag={false} />
        <TabBar member={true} />
        <div className={styles.screenContent}>
          <div className={styles.logoArea}>
            <img src={logo}></img>
          </div>
          <div className={styles.member}>黃又影 您好！</div>
          <Link to={path.consumerRecord} className={styles.button}>
            <Button title={'消費記錄'}></Button>
          </Link>
          <Link to={path.coupon} className={styles.button}>
            <Button title={'優惠券票夾'}></Button>
          </Link>
          <Link to={path.habitSetting} className={styles.button}>
            <Button title={'偏好設定'}></Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default Member;
