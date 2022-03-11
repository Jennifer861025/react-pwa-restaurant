import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
import menu from '../../assets/json/menu.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
  const [value, setValue] = useState('');
  const [orderDetail, setOrderDetail] = useState({});
  const price = localStorage.getItem('pricePlan');
  const mealHabit = JSON.parse(localStorage.getItem('mealHabits'));
  const menuChoose = menu.filter((x) => x.plan == price);

  const submitHandler = () => {
    alert('餐點將盡快為您送達！');
    localStorage.setItem('orderDetail', JSON.stringify(orderDetail));
    const newObj = { ...orderDetail };
    Object.keys(newObj).forEach((key) => {
      delete newObj[key];
    });
    setOrderDetail(newObj);
    // history.push(path.mealHabits);
  };
  const buttonHandler = (valueClick) => {
    if (valueClick !== value) {
      setValue(valueClick);
    } else {
      setValue('');
    }
  };
  const minusHandler = (option) => {
    console.log('option: ' + option);
    console.log('minus:' + JSON.stringify(orderDetail));
    const newObj = { ...orderDetail };
    if (newObj[option] == undefined) {
      newObj[option] = 0;
    } else {
      if (newObj[option] == 0) {
        newObj[option] = 0;
      } else {
        newObj[option] = newObj[option] - 1;
      }
    }
    setOrderDetail(newObj);
  };
  const plusHandler = (option) => {
    console.log('option: ' + option);
    console.log('plus:' + JSON.stringify(orderDetail));
    const newObj = { ...orderDetail };
    if (newObj[option] == undefined) {
      newObj[option] = 1;
    } else {
      newObj[option] = newObj[option] + 1;
    }
    setOrderDetail(newObj);
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
            <div className={styles.timeCount}>用餐時間倒數：02:00:00</div>
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
                                    {orderDetail[seafoodOption] == undefined
                                      ? 0
                                      : orderDetail[seafoodOption]}
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
                                {orderDetail[option] == undefined
                                  ? 0
                                  : orderDetail[option]}
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
