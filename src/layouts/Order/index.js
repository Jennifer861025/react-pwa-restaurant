/* eslint-disable prettier/prettier */
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
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
  var day = new Date();
  var nowHour = day.getHours();
  var nowMinute = day.getMinutes();
  var nowSecond = day.getSeconds();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  // const [hour] = useState(2);
  // const [minute] = useState(0);
  // const [second] = useState(0);
  const [value, setValue] = useState('');
  const [orderArray, setOrderArray] = useState([]);
  const history = useHistory();
  const price = localStorage.getItem('pricePlan');
  const mealHabit = JSON.parse(localStorage.getItem('mealHabits'));
  const menuChoose = menu.filter((x) => x.plan == price);

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
    if (localStorage.getItem('finishTime') == null) {
      localStorage.setItem(
        'finishTime',
        `${nowHour + 2}:${nowMinute}:${nowSecond}`,
      );
    }

    setInterval(() => {
      var date = new Date();
      var currentHour = date.getHours();
      var currentMinute = date.getMinutes();
      var currentSecond = date.getSeconds();
      var second =
        currentSecond > timeArray[2]
          ? timeArray[2] + 60 - currentSecond
          : timeArray[2] - currentSecond;
      var minute =
        currentMinute > Number(timeArray[1])
          ? Number(timeArray[1]) + 60 - currentMinute
          : Number(timeArray[1]) - currentMinute
      var hour = currentMinute > Number(timeArray[1]) ? Number(timeArray[0]) - currentHour - 1 : Number(timeArray[0]) - currentHour;
      setSecond(second);
      setMinute(minute);
      setHour(hour);
    }, 1000);
  }, []);

  const submitHandler = () => {
    alert('餐點將盡快為您送達！');

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

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>點餐</title>
        <meta name="description" content="點餐" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'點餐'}
          linkFlag={false}
          rightLink={path.orderRecord}
          rightLinkFlag={true}
        />
        <TabBar order={true} />
        <div className={styles.screenContent}>
          <div className={styles.mainContent}>
            <div className={styles.timeCount}>
              用餐時間倒數：{zeroFill(hour)}：{zeroFill(minute)}：
              {zeroFill(second)}
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
                                <div>{seafoodOption}</div>
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
                            <div>{option}</div>
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
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Order;
