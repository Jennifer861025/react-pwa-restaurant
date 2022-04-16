import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import reservationBanner from '../../assets/image/reservationBanner.png';
import { StoreContext } from '../../store/reducer';
import { setReservation } from '../../store/action';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';

const Reservation = () => {
  const {
    state: {
      reservationNum,
      requestdata: { loading },
    },
    dispatch,
  } = useContext(StoreContext);

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [date, setDate] = useState(null);
  const [peopleNum, setPeopleNum] = useState(1);
  const [time, setTime] = useState(null);
  const [seatArray, setSeatArray] = useState(null);
  //Alert的開關及內容
  const [alertFlag, setAlertFlag] = useState(false);
  const [Alertshow, setAlertshow] = useState(false);
  const [Alerttext, setAlerttext] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name + phone + date + peopleNum + time + seatArray);
    console.log(typeof date);
    await setReservation(dispatch, {
      name: name,
      phone: phone,
      date: date,
      peopleNum: peopleNum,
      time: time,
      seatArray: [seatArray],
    });
    setAlertFlag(true);
  };

  useEffect(() => {
    if (reservationNum !== null && reservationNum !== undefined) {
      if (alertFlag == true) {
        setAlertshow(true);
        setAlerttext(`已完成訂位，您的訂位編號為${reservationNum}`);
        setAlertFlag(false);
      }
    }
  }, [reservationNum, alertFlag]);

  return (
    <Fragment>
      <Alert
        show={Alertshow}
        onHide={() => {
          setAlertshow(false);
          setAlerttext('');
        }}
        text={Alerttext}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>訂位</title>
            <meta name="description" content="訂位" />
          </Helmet>
          <div className={styles.screen}>
            <div className={styles.screenContent}>
              <Header />
              <div className={styles.content}>
                <div className={styles.bannerArea}>
                  <img src={reservationBanner}></img>
                </div>
                <div className={styles.content_content}>
                  <div className={styles.title}>XRestaurant 線上訂位</div>
                  <hr className={styles.hr}></hr>
                </div>
                <form onSubmit={submitHandler} className={styles.form}>
                  <div className={styles.input_section}>
                    <div className={styles.form_inputArea}>
                      <label className={styles.label}>顧客大名：</label>
                      <input
                        className={styles.input_box}
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styles.form_inputArea}>
                      <label className={styles.label}>電話號碼：</label>
                      <input
                        className={styles.input_box}
                        type="number"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.input_section}>
                    <div className={styles.form_inputArea}>
                      <label className={styles.label}>用餐日期：</label>
                      <input
                        className={styles.input_box}
                        type="date"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styles.form_inputArea}>
                      <label className={styles.label}>用餐人數：</label>
                      <input
                        className={styles.input_box}
                        type="number"
                        defaultValue={peopleNum}
                        min="1"
                        onChange={(e) => {
                          setPeopleNum(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.input_section}>
                    <div className={styles.form_inputArea}>
                      <label>選擇時段：</label>
                      <div
                        onChange={(e) => {
                          setTime(e.target.value);
                        }}
                      >
                        <label className={styles.radio_label}>
                          <input type="radio" value="11:00" name="time" />
                          <span>11:00</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="12:00" name="time" />
                          <span>12:00</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="13:00" name="time" />
                          <span>13:00</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="14:00" name="time" />
                          <span>14:00</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="15:00" name="time" />
                          <span>15:00</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="16:00" name="time" />
                          <span>16:00</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="17:00" name="time" />
                          <span>17:00</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.input_section}>
                    <div className={styles.form_inputArea}>
                      <label>座位偏好：</label>
                      <div
                        onChange={(e) => {
                          setSeatArray(e.target.value);
                        }}
                      >
                        <label className={styles.radio_label}>
                          <input type="radio" value="window" name="label" />
                          <span>靠窗座位</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="alley" name="label" />
                          <span>靠走道座位</span>
                        </label>
                        <label className={styles.radio_label}>
                          <input type="radio" value="door" name="label" />
                          <span>靠近門口座位</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.button}>
                    <Button type="submit" title={'送出'}></Button>
                  </div>
                </form>
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Reservation;
