import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import path from '../../utils/path';
import { useHistory } from 'react-router';
import { StoreContext } from '../../store/reducer';
import { getReservation } from '../../store/action';

const ReservationInfo = () => {
  const {
    state: {
      requestdata: { error, loading },
    },
    dispatch,
  } = useContext(StoreContext);
  const history = useHistory();
  const [phoneNum, setPhoneNum] = useState(null);
  const [reserveNum, setReserveNum] = useState(null);
  const [getDataFlag, setGetDataFlag] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setGetDataFlag(false);
    if (phoneNum == null) {
      alert('請輸入電話號碼');
    } else if (reserveNum == null) {
      alert('請輸入定位編號');
    } else {
      console.log(phoneNum + reserveNum);
      await getReservation(dispatch, {
        phone: phoneNum,
        reservationNum: reserveNum,
      });
      setGetDataFlag(true);
    }
  };

  useEffect(() => {
    if (getDataFlag == true) {
      if (error == true) {
        setGetDataFlag(false);
      } else {
        localStorage.setItem('phone', phoneNum);
        history.push(path.tableNumInfo);
      }
    }
  }, [getDataFlag]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                <Button type="submit" title={'送出'} marginTop={true}></Button>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ReservationInfo;
