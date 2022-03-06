import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import { useHistory } from 'react-router';

const NoReserved = () => {
  const history = useHistory();
  const [name, setName] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  // const [peopleNum, setPeopleNum] = useState(1);
  const submitHandler = (e) => {
    e.preventDefault();
    if (name == null) {
      alert('請輸入姓名');
    } else if (phoneNum == null) {
      alert('請輸入電話號碼');
    } else {
      // console.log(peopleNum);
      history.push(path.waiting);
    }
  };
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>登記候位</title>
        <meta name="description" content="登記候位" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'登記候位'}
          link={path.bookingConfirm}
          linkFlag={true}
        />
        <div className={styles.screenContent}>
          <div className={styles.top}>XRestaurant 國北店</div>
          <div className={styles.waitingInfo}>目前尚有 3 組在等候</div>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.form_inputArea}>
              <label>姓名</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
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
              <label>用餐人數</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <Button type="submit" title={'送出'} marginTop={true}></Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default NoReserved;
