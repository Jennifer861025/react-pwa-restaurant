import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
import menu from '../../assets/json/menu.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { setOrderDetail } from '../../store/action';
import DoubleCheckModel from '../../components/DoubleCheckModel';

var timeCount;
const Order = () => {
  var day = new Date();
  var nowYear = day.getFullYear();
  var nowMonth = day.getMonth() + 1;
  var nowDay = day.getDate();
  var nowHour = day.getHours();
  var nowMinute = day.getMinutes();
  var nowSecond = day.getSeconds();
  const [orderHour, setHour] = useState();
  const [orderMinute, setMinute] = useState();
  const [orderSecond, setSecond] = useState();
  const [value, setValue] = useState('');
  var arrayInit = [];
  const [orderArray, setOrderArray] = useState(arrayInit);
  const [finishFlag, setFinishFlag] = useState(false);
  const [doubleCheckShow, setDoubleCheckShow] = useState(false);
  const [alertOption, setAlertOption] = useState('');
  const [alertOptionArray, setAlertOptionArray] = useState(arrayInit);
  const history = useHistory();
  const price = localStorage.getItem('pricePlan');
  const mealHabit = JSON.parse(localStorage.getItem('mealHabits'));
  const menuChoose = menu.filter((x) => x.plan == price);
  const finishTimeData = localStorage.getItem('finishTimeDetail')
    ? JSON.parse(localStorage.getItem('finishTimeDetail'))
    : {};
  const pastValue = localStorage.getItem('orderPageTypeValue')
    ? localStorage.getItem('orderPageTypeValue')
    : '';
  const pastOrderArray = localStorage.getItem('orderArray')
    ? JSON.parse(localStorage.getItem('orderArray'))
    : [];
  const foodDetailFlag = localStorage.getItem('foodDetailFlag')
    ? JSON.parse(localStorage.getItem('foodDetailFlag'))
    : false;
  const tableNum = JSON.parse(localStorage.getItem('reservationData')).tableNum;
  const orderSubmitFlag = localStorage.getItem('orderSubmitFlag')
    ? JSON.parse(localStorage.getItem('orderSubmitFlag'))
    : false;
  const orderDetail = localStorage.getItem('orderDetail')
    ? JSON.parse(localStorage.getItem('orderDetail'))
    : [{ 'option': '' }];

  const zeroFill = (x) => {
    if (x < 10) {
      x = `0${x}`;
    }
    return x;
  };

  // 用餐時間倒數設定
  var finishTime = localStorage.getItem('finishTime')
    ? localStorage.getItem('finishTime')
    : `${nowHour + 2}:${nowMinute}:${nowSecond}`;

  const timeArray = finishTime.split(':');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('finishFlag'))) {
      setFinishFlag(true);
      setHour(0);
      setMinute(0);
      setSecond(0);
      clearInterval(timeCount);
      history.push(path.checkout);
      return;
    }
    if (foodDetailFlag == true && orderSubmitFlag == false) {
      setValue(pastValue);
      setOrderArray(pastOrderArray);
      localStorage.setItem('foodDetailFlag', false);
    }
    if (localStorage.getItem('finishTime') == null) {
      localStorage.setItem(
        'finishTimeDetail',
        JSON.stringify({
          'year': nowYear,
          'month': nowMonth,
          'day': nowDay,
          'hour': nowHour + 2,
          'minute': nowMinute,
          'second': nowSecond,
        }),
      );
      localStorage.setItem(
        'finishTime',
        `${nowHour + 2}:${nowMinute}:${nowSecond}`,
      );
    } else {
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
        console.log('!!!!!!!');
        clearInterval(timeCount);
        setHour(0);
        setMinute(0);
        setSecond(0);
      }
    }
    localStorage.setItem('orderSubmitFlag', false);
    timeCount = setInterval(() => {
      if (finishFlag == false) {
        getOrderTime();
      }
    }, 1000);
  }, []);

  //用餐時間Finish設定
  useEffect(() => {
    if (
      orderHour == 0 &&
      orderMinute == 0 &&
      orderSecond == 0 &&
      finishFlag == false
    ) {
      setSecond(0);
      alert('用餐時間已經到囉！請前往結帳！');
      clearInterval(timeCount);
      setFinishFlag(true);
      localStorage.setItem('finishFlag', JSON.stringify(true));
      history.push(path.checkout);
    }
  }, [orderHour, orderMinute, orderSecond, finishFlag]);

  //用餐時間設定
  const getOrderTime = () => {
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    var currentSecond = date.getSeconds();
    var finishSecond = Number(timeArray[2]);
    var finishMinute = Number(timeArray[1]);
    var finishHour = Number(timeArray[0]);
    if (finishSecond < currentSecond) {
      setSecond(finishSecond + 60 - currentSecond);
      if (finishMinute - 1 < currentMinute) {
        setMinute(finishMinute + 59 - currentMinute);
        setHour(finishHour - 1 - currentHour);
        return;
      } else {
        setMinute(finishMinute - 1 - currentMinute);
        setHour(finishHour - currentHour);
        return;
      }
    } else {
      setSecond(finishSecond - currentSecond);
      if (finishMinute < currentMinute) {
        setMinute(finishMinute + 60 - currentMinute);
        setHour(finishHour - 1 - currentHour);
        return;
      } else {
        setMinute(finishMinute - currentMinute);
        setHour(finishHour - currentHour);
        return;
      }
    }
  };

  const submitHandler = () => {
    alert('餐點將盡快為您送達！');

    localStorage.setItem('orderSubmitFlag', true);

    const orderDetail = orderArray.filter((x) => x.number !== 0);
    var allOrderDetail = JSON.parse(localStorage.getItem('allOrderDetail'));
    var preOrderDetail = JSON.parse(localStorage.getItem('orderDetail'));

    //將顧客所有點餐的紀錄都丟到localStorage
    if (localStorage.getItem('allOrderDetail') === null) {
      if (preOrderDetail !== null) {
        localStorage.setItem('allOrderDetail', JSON.stringify(preOrderDetail));
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
      localStorage.setItem('allOrderDetail', JSON.stringify(allOrderDetail));
    }

    //挑選如果數量是0的項目，就不會在紀錄中顯示
    localStorage.setItem('orderDetail', JSON.stringify(orderDetail));

    setOrderDetail({
      orderDetail: orderDetail,
      tableNum: tableNum,
    });

    //存完之後，將點餐頁的Array清空
    var newArray = { ...orderArray };
    newArray = [];
    setOrderArray(newArray);

    //切換到點餐紀錄的頁面
    history.push(path.orderRecord);
  };

  //若點開其他的項目，原本的項目會收合選單
  const buttonHandler = (valueClick) => {
    if (valueClick !== value) {
      setValue(valueClick);
    } else {
      setValue('');
    }
  };

  //減號按鈕控制
  const minusHandler = (option) => {
    const newArray = [...orderArray];
    var newObj = {};
    if (newArray.some((x) => x.option == option) == false) {
      const newObj = { 'option': option, 'number': 0 };
      newArray.push(newObj);
      setOrderArray(newArray);
    } else {
      newObj = newArray.filter((x) => x.option == option);
      if (newObj[0].number == 0) {
        newObj[0].number = 0;
        setOrderArray(newArray);
      } else {
        newObj[0].number = newObj[0].number - 1;
        setOrderArray(newArray);
      }
    }
  };

  //加號按鈕控制
  const plusHandler = (option) => {
    if (orderDetail.some((x) => x.option == option)) {
      if (alertOptionArray.includes(option) == false) {
        var checkArray = [...alertOptionArray];
        checkArray.push(option);
        setAlertOptionArray(checkArray);
        setAlertOption(option);
        setDoubleCheckShow(true);
        return;
      }
    }
    const newArray = [...orderArray];
    var newObj = {};
    if (newArray.some((x) => x.option == option) == false) {
      const newObj = { 'option': option, 'number': 1 };
      newArray.push(newObj);
      setOrderArray(newArray);
    } else {
      newObj = newArray.filter((x) => x.option == option);
      newObj[0].number = newObj[0].number + 1;
      setOrderArray(newArray);
    }
  };

  const leftBtnHandler = () => {
    var checkArray = [...alertOptionArray];
    checkArray = checkArray.filter((x) => x !== alertOption);
    setAlertOptionArray(checkArray);
    setDoubleCheckShow(false);
  };

  const rightBtnHandler = () => {
    plusHandler(alertOption);
    setDoubleCheckShow(false);
  };

  useEffect(() => {
    console.log('alertOptionArray: ' + JSON.stringify(alertOptionArray));
    console.log('alertOption: ' + alertOption);
  }, [alertOptionArray, alertOption]);

  useEffect(() => {
    localStorage.setItem('orderArray', JSON.stringify(orderArray));
  }, [orderArray]);

  //食材資訊
  const FoodDetailHandler = (optionTitle) => {
    const location = {
      pathname: path.foodDetail,
      state: { foodTitle: optionTitle },
    };
    history.push(location);
  };

  useEffect(() => {
    localStorage.setItem('orderPageTypeValue', value);
  }, [value]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>點餐</title>
        <meta name="description" content="點餐" />
      </Helmet>
      <DoubleCheckModel
        show={doubleCheckShow}
        closeHandler={() => setDoubleCheckShow(false)}
        modalTitle={'食材已加點正在準備中！'}
        modalBody={
          '您在上次的菜單點選已選擇此食材，若您確定需要繼續加點請點選確定！'
        }
        leftBtnTitle={'取消'}
        leftBtnHandler={leftBtnHandler}
        rightBtnTitle={'確定'}
        rightBtnHandler={rightBtnHandler}
      />
      <div className={styles.screen}>
        <NavigationBar
          title={'桌點餐'}
          linkFlag={false}
          rightLink={path.orderRecord}
          rightLinkFlag={true}
          tableNumFlag={true}
          tableNum={tableNum}
        />
        <TabBar order={true} />
        <div className={styles.screenContent}>
          <div className={styles.mainContent}>
            <div className={styles.timeCount}>
              用餐時間倒數：{zeroFill(orderHour)}：{zeroFill(orderMinute)}：
              {zeroFill(orderSecond)}
            </div>
            {menuChoose[0].planType.map((plan) =>
              mealHabit.includes(plan.type) ? (
                <></>
              ) : (
                <div
                  key={plan.typeID}
                  className={
                    value === plan.type
                      ? styles.optionArea
                      : styles.optionArea_top
                  }
                >
                  <div className={styles.optionBox}>
                    <div>{plan.typeName}</div>
                    <button
                      className={
                        value === plan.type
                          ? styles.optionBtnUp
                          : styles.optionBtnDown
                      }
                      onClick={() => buttonHandler(plan.type)}
                    >
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                  </div>
                  <div
                    className={
                      value === plan.type
                        ? styles.optionControl
                        : styles.optionControl_hide
                    }
                  >
                    <div className={styles.option_list}>
                      {plan.typeOption.map((option) =>
                        plan.type === 'seafood' ? (
                          mealHabit.includes(option.seafoodType) ? (
                            <></>
                          ) : (
                            option.seafoodOption.map((seafoodOption) => (
                              <div
                                key={seafoodOption}
                                className={styles.option}
                              >
                                <div
                                  className={styles.optionTitle}
                                  onClick={() =>
                                    FoodDetailHandler(seafoodOption)
                                  }
                                >
                                  <div className={styles.optionIntroIcon}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                  </div>
                                  <div
                                    className={
                                      orderDetail.some(
                                        (x) => x.option == seafoodOption,
                                      )
                                        ? styles.optionTitle_red
                                        : ''
                                    }
                                  >
                                    {seafoodOption}
                                  </div>
                                </div>
                                <div className={styles.numberControl}>
                                  <button
                                    className={styles.numberControl_btn}
                                    onClick={() => minusHandler(seafoodOption)}
                                  >
                                    -
                                  </button>
                                  <div className={styles.numberControl_number}>
                                    {orderArray.some(
                                      (x) => x.option == seafoodOption,
                                    ) == false
                                      ? 0
                                      : orderArray.filter(
                                          (x) => x.option == seafoodOption,
                                        )[0].number}
                                  </div>
                                  <button
                                    className={styles.numberControl_btn}
                                    onClick={() => plusHandler(seafoodOption)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))
                          )
                        ) : (
                          <div key={option} className={styles.option}>
                            <div
                              className={styles.optionTitle}
                              onClick={() => FoodDetailHandler(option)}
                            >
                              <div className={styles.optionIntroIcon}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                              </div>
                              <div
                                className={
                                  orderDetail.some((x) => x.option == option)
                                    ? styles.optionTitle_red
                                    : ''
                                }
                              >
                                {option}
                              </div>
                            </div>
                            <div className={styles.numberControl}>
                              <button
                                className={styles.numberControl_btn}
                                onClick={() => minusHandler(option)}
                              >
                                -
                              </button>
                              <div className={styles.numberControl_number}>
                                {orderArray.some((x) => x.option == option) ==
                                false
                                  ? 0
                                  : orderArray.filter(
                                      (x) => x.option == option,
                                    )[0].number}
                              </div>
                              <button
                                className={styles.numberControl_btn}
                                onClick={() => plusHandler(option)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
            <div className={styles.submitBtn}>
              <Button
                title={'送出'}
                main={false}
                onClickHandler={submitHandler}
                disable={finishFlag ? true : false}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Order;
