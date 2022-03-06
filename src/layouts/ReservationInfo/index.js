import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import NavigationBar from '../../components/NavigationBar';
import path from '../../utils/path';
import { useHistory } from 'react-router';

const ReservationInfo = () => {
  const history = useHistory();
  const [phoneNum, setPhoneNum] = useState(null);
  const [reserveNum, setReserveNum] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (phoneNum == '') {
      alert('請輸入電話號碼');
    } else if (reserveNum == '') {
      alert('請輸入定位編號');
    }
    console.log(phoneNum + reserveNum);
    history.push(path.tableNumInfo);
  };

  //TODO:這裡是畫面的開始
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>訂位資訊</title>
        <meta name="description" content="訂位資訊" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'訂位資訊'}
          link={path.bookingConfirm}
          linkFlag={true}
        />
        <div className={styles.screenContent}>
          <div className={styles.top}>您今日訂的是</div>
          <div className={styles.incTitle}>XRestaurant 國北店</div>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.form_inputArea}>
              <label>電話號碼</label>
              <input
                type="number"
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              />
            </div>
            <div className={styles.form_inputArea}>
              <label>訂位編號</label>
              <input
                type="text"
                onChange={(e) => {
                  setReserveNum(e.target.value);
                }}
              />
            </div>
            <button className={styles.submitBtn} type="submit">
              送出
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ReservationInfo;
