import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';

const Reserved = () => {
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
  };
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>訂位資訊</title>
        <meta name="description" content="訂位資訊" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <form onSubmit={submitHandler}>
            <label>電話號碼</label>
            <input
              type="number"
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
            <label>訂位編號</label>
            <input
              type="text"
              onChange={(e) => {
                setReserveNum(e.target.value);
              }}
            />
            <button type="submit">送出</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Reserved;
