import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import { Link, useHistory } from 'react-router-dom';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';

const Waiting = () => {
  const history = useHistory();
  const cancelHandler = () => {
    alert('已為您取消！');
    history.push(path.bookingConfirm);
  };
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>等候叫號</title>
        <meta name="description" content="等候叫號" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'等候叫號'} linkFlag={false} />
        <div className={styles.screenContent}>
          <div className={styles.incInfo}>XRestaurant 國北店</div>
          <div className={styles.waitNumInfo}>您前面有幾組後位：</div>
          <div className={styles.numberArea}>
            <div className={styles.number}>0</div>
            <div className={styles.number}>0</div>
            <div className={styles.number}>1</div>
          </div>
          <div className={styles.waitTimeArea}>
            <div>預計等候時間</div>
            <div className={styles.waitTime}>15</div>
            <div>分鐘</div>
          </div>
          <div>請等候系統訊息通知</div>
          <Link to={path.menu} className={styles.button}>
            <Button title={'查看菜單'} marginTop={true}></Button>
          </Link>
          <Button title={'取消候位'} onClickHandler={cancelHandler}></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default Waiting;
