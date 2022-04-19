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

const HabitSetting = () => {
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
  const seatArray = [];
  const [meatHabit, setMeatHabit] = useState(meatArray);
  const [seafoodHabit, setSeafoodHabit] = useState(seafoodArray);
  const [seatHabit, setSeatHabit] = useState(seatArray);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const phone = localStorage.getItem('phone');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingFlag(true);
    await setUserHabit(dispatch, {
      phone: phone,
      meatHabit: meatHabit,
      seafoodHabit: seafoodHabit,
      seatHabit: seatHabit,
    });
    const mealHabit = meatHabit.concat(seafoodHabit);
    localStorage.setItem('mealHabits', JSON.stringify(mealHabit));
    history.push(path.order);
  };

  useEffect(() => {
    getUserHabit(dispatch, { phone: phone });
  }, []);

  useEffect(() => {
    if (loading == false) {
      if (finish == true) {
        setMeatHabit(meat);
        setSeafoodHabit(allergy);
        setSeatHabit(seat);
        setLoadingFlag(false);
      }
    }
  }, [loading, finish]);

  useEffect(() => {
    console.log(seatHabit);
  }, [seatHabit]);

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
    } else if (qTitle == 'seat') {
      if (seatHabit.includes(e) == false) {
        if (seatHabit.length == 1) {
          const newSeat = [e];
          setSeatHabit(newSeat);
        } else {
          const newSeat = [...seatHabit];
          newSeat.push(e);
          setSeatHabit(newSeat);
        }
      } else {
        setSeatHabit([]);
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
    } else if (qTitle == 'seat') {
      if (seatHabit.includes(optionValue)) {
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
            <title>偏好設定</title>
            <meta name="description" content="偏好設定" />
          </Helmet>
          <div className={styles.screen}>
            <NavigationBar
              title={'偏好設定'}
              link={path.member}
              linkFlag={true}
            />
            <div className={styles.screenContent}>
              <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
                {habit.map((q) => (
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
                ))}
                <div className={styles.buttonArea}>
                  <Button title={'儲存'} type="submit"></Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default HabitSetting;
