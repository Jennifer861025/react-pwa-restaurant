import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
import DoubleCheckModel from '../../components/DoubleCheckModel';
import { setUserOrderDetail } from '../../store/action';
// import { getUser } from '../../store/action';

const Checkout = () => {
  const history = useHistory();
  var day = new Date();
  var nowYear = day.getFullYear();
  var nowMonth = day.getMonth() + 1;
  var nowDay = day.getDate();
  var nowHour = day.getHours();
  var nowMinute = day.getMinutes();
  var nowSecond = day.getSeconds();
  const [doubleCheckShow, setDoubleCheckShow] = useState(false);

  const finishTimeData = localStorage.getItem('finishTimeDetail')
    ? JSON.parse(localStorage.getItem('finishTimeDetail'))
    : {};

  const feedbackFinish = localStorage.getItem('feedbackFinish')
    ? JSON.parse(localStorage.getItem('feedbackFinish'))
    : false;

  const reservationData = localStorage.getItem('reservationData')
    ? JSON.parse(localStorage.getItem('reservationData'))
    : { 'peopleNum': 0, 'tableNum': 0, 'date': '' };

  const pricePlan = Number(localStorage.getItem('pricePlan'));

  const couponValue = localStorage.getItem('couponChoose')
    ? JSON.parse(localStorage.getItem('couponChoose')).couponValue
    : 0;

  const allOrderDetail = localStorage.getItem('allOrderDetail')
    ? JSON.parse(localStorage.getItem('allOrderDetail'))
    : null;
  const preOrderDetail = localStorage.getItem('orderDetail')
    ? JSON.parse(localStorage.getItem('orderDetail'))
    : null;

  const orderDetailHandler = () => {
    if (allOrderDetail == null) {
      if (preOrderDetail !== null) {
        return preOrderDetail;
      } else {
        return [];
      }
    } else {
      preOrderDetail.map((orderDetail) => {
        if (
          allOrderDetail.some((x) => x.option == orderDetail.option) == true
        ) {
          var newObj = allOrderDetail.filter(
            (x) => x.option == orderDetail.option,
          );
          newObj[0].number += orderDetail.number;
        } else {
          allOrderDetail.push(orderDetail);
        }
      });
      return allOrderDetail;
    }
  };

  const phone = localStorage.getItem('phone');

  const totalPrice = reservationData.peopleNum * pricePlan - couponValue;

  const feedbackBtnHandler = () => {
    history.push(path.feedback);
  };

  const zeroFill = (x) => {
    if (x < 10) {
      x = `0${x}`;
    }
    return x;
  };

  const checkoutHandler = () => {
    let date1 = new Date(
      finishTimeData.year,
      finishTimeData.month,
      finishTimeData.day,
      finishTimeData.hour,
      finishTimeData.minute,
      finishTimeData.second,
    );
    let date2 = new Date(
      nowYear,
      nowMonth,
      nowDay,
      nowHour,
      nowMinute,
      nowSecond,
    );
    if (date1.getTime() < date2.getTime()) {
      setUserOrderDetail({
        phone: phone,
        pricePlan: pricePlan,
        date: `${nowYear}/${zeroFill(nowMonth)}/${zeroFill(nowDay)}`,
        tableNum: reservationData.tableNum,
        peopleNum: reservationData.peopleNum,
        allOrderDetail: orderDetailHandler(),
      });
      history.push(path.checkoutOptions);
    } else {
      setDoubleCheckShow(true);
    }
  };

  const comfirmHandler = () => {
    setUserOrderDetail({
      phone: phone,
      pricePlan: pricePlan,
      date: `${nowYear}/${zeroFill(nowMonth)}/${zeroFill(nowDay)}`,
      tableNum: reservationData.tableNum,
      peopleNum: reservationData.peopleNum,
      allOrderDetail: orderDetailHandler(),
    });
    history.push(path.checkoutOptions);
  };

  useEffect(() => {
    console.log(feedbackFinish);
    console.log(allOrderDetail);
    console.log(preOrderDetail);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>????????????</title>
        <meta name="description" content="????????????" />
      </Helmet>
      <DoubleCheckModel
        show={doubleCheckShow}
        closeHandler={() => setDoubleCheckShow(false)}
        modalTitle={'????????????????????????'}
        modalBody={'????????????????????????????????????????????????????????????????????????????????????'}
        leftBtnTitle={'??????'}
        leftBtnHandler={() => setDoubleCheckShow(false)}
        rightBtnTitle={'????????????'}
        rightBtnHandler={comfirmHandler}
      />
      <div className={styles.screen}>
        <NavigationBar title={'????????????'} link={path.menu} linkFlag={false} />
        <TabBar checkout={true} />
        <div className={styles.screenContent}>
          <div className={styles.incTitle}>XRestaurant ?????????</div>
          <div className={styles.checkDetail}>
            <div className={styles.checkDetail_peopleNum}>
              ?????????????????????{reservationData.peopleNum}???
            </div>
            <div className={styles.checkDetail_pricePlan}>
              ??????????????????{pricePlan}??????
            </div>
            <div className={styles.checkDetail_moneyArea}>
              <div>???????????????</div>
              <div
                className={couponValue == 0 ? styles.money : styles.money_red}
              >
                {totalPrice}???
              </div>
              <div
                className={
                  couponValue == 0
                    ? styles.couponFinish_hide
                    : styles.couponFinish
                }
              >
                ?????????
              </div>
            </div>
            <div className={styles.checkDetail_couponMemo}>
              ????????????????????????????????????<br></br>?????????????????????????????????
            </div>
            <button
              className={
                feedbackFinish
                  ? `${styles.button} ${styles.button_disabled}`
                  : styles.button
              }
              onClick={feedbackBtnHandler}
              disabled={feedbackFinish ? 'disabled' : ''}
            >
              {feedbackFinish ? '???????????????' : '????????????'}
            </button>
            <Button
              title={'??????'}
              main={false}
              onClickHandler={checkoutHandler}
            ></Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Checkout;
