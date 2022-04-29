import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import habit from '../../assets/json/habit.json';
import Loading from '../../components/Loading';
import { StoreContext } from '../../store/reducer';
import { setUserHabit, getUserHabit } from '../../store/action';
import DoubleCheckModel from '../../components/DoubleCheckModel';

const MealHabits = () => {
  const history = useHistory();
  const {
    state: {
      habit: { meat, allergy, seat, finish },
      requestdata: { loading },
    },
    dispatch,
  } = useContext(StoreContext);
  const meatArray = [];
  const seafoodArray = [];
  const [meatHabit, setMeatHabit] = useState(meatArray);
  const [seafoodHabit, setSeafoodHabit] = useState(seafoodArray);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [doubleCheckShow, setDoubleCheckShow] = useState(false);
  const phone = localStorage.getItem('phone');

  const submitHandler = async (e) => {
    e.preventDefault();
    setDoubleCheckShow(true);
  };

  const rightBtnHandler = async () => {
    setLoadingFlag(true);
    await setUserHabit(dispatch, {
      phone: phone,
      meatHabit: meatHabit,
      seafoodHabit: seafoodHabit,
      seatHabit: seat,
    });
    localStorage.setItem('mealHabitsFlag', true);
    history.push(path.order);
  };

  useEffect(() => {
    const userMealHabit = meatHabit.concat(seafoodHabit);
    localStorage.setItem('mealHabits', JSON.stringify(userMealHabit));
  }, [meatHabit, seafoodHabit]);
  useEffect(() => {
    getUserHabit(dispatch, { phone: phone });
  }, []);

  useEffect(() => {
    if (loading == false) {
      if (finish == true) {
        setMeatHabit(meat);
        setSeafoodHabit(allergy);
        setLoadingFlag(false);
      }
    }
  }, [loading, finish]);

  const selectedChange = (e, qTitle) => {
    if (qTitle == 'meat') {
      if (meatHabit.includes(e) === false) {
        const newMeat = [...meatHabit];
        newMeat.push(e);
        setMeatHabit(newMeat);
      } else {
        const newMeat = [...meatHabit];
        const filterMeat = newMeat.filter((x) => x != e);
        setMeatHabit(filterMeat);
      }
    } else if (qTitle == 'seafood') {
      if (seafoodHabit.includes(e) == false) {
        if (seafoodHabit.length == 1) {
          const newSeafood = [e];
          setSeafoodHabit(newSeafood);
        } else {
          const newSeafood = [...seafoodHabit];
          newSeafood.push(e);
          setSeafoodHabit(newSeafood);
        }
      } else {
        setSeafoodHabit([]);
      }
    }
  };

  const classNameHandler = (qTitle, optionValue) => {
    if (qTitle == 'meat') {
      if (meatHabit.includes(optionValue)) {
        return true;
      } else {
        return false;
      }
    } else if (qTitle == 'seafood') {
      if (seafoodHabit.includes(optionValue)) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <Fragment>
      {loadingFlag ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>用餐偏好</title>
            <meta name="description" content="用餐偏好" />
          </Helmet>
          <DoubleCheckModel
            show={doubleCheckShow}
            closeHandler={() => setDoubleCheckShow(false)}
            modalTitle={'是否確定開始點餐'}
            modalBody={
              '若開始點餐後，點餐倒數時間將會開始計算，為了保障您的權益，可考慮是否要開始點餐'
            }
            leftBtnTitle={'取消'}
            leftBtnHandler={() => setDoubleCheckShow(false)}
            rightBtnTitle={'確定'}
            rightBtnHandler={rightBtnHandler}
          />
          <div className={styles.screen}>
            <NavigationBar title={'用餐偏好'} linkFlag={false} />
            <div className={styles.screenContent}>
              <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
                {habit.map((q) =>
                  q.qID === 3 ? (
                    <></>
                  ) : (
                    <div key={q.qID} className={styles.question}>
                      <label>{q.question}</label>
                      {q.options.map((option) => (
                        <label
                          key={option.id}
                          className={
                            classNameHandler(q.title, option.value) == true
                              ? styles.option_active
                              : styles.option
                          }
                        >
                          <input
                            type="checkbox"
                            name={'stuAnswer' + q.qID}
                            value={option.value}
                            onChange={(e) =>
                              selectedChange(e.target.value, q.title)
                            }
                            className={styles.input}
                          />
                          {option.option}
                        </label>
                      ))}
                    </div>
                  ),
                )}
                <div className={styles.buttonArea}>
                  <Button title={'開始點餐'} type="submit"></Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default MealHabits;
