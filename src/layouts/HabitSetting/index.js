import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import habit from '../../assets/json/habit.json';

const HabitSetting = () => {
  const history = useHistory();
  const a = [];
  const [answer, setAnswer] = useState(a);
  const submitHandler = () => {
    localStorage.setItem('mealHabits', JSON.stringify(answer));
    history.push(path.order);
  };

  const selectedChange = (e) => {
    if (answer.includes(e) === false) {
      const newAnswer = [...answer];
      newAnswer.push(e);
      if (e == 'seafood') {
        const filterAnswer = newAnswer.filter((x) => x != 'shell');
        setAnswer(filterAnswer);
        return;
      } else if (e == 'shell') {
        const filterAnswer = newAnswer.filter((x) => x != 'seafood');
        setAnswer(filterAnswer);
        return;
      }
      setAnswer(newAnswer);
    } else {
      const newAnswer = [...answer];
      const filterAnswer = newAnswer.filter((x) => x != e);
      setAnswer(filterAnswer);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>偏好設定</title>
        <meta name="description" content="偏好設定" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'偏好設定'} link={path.member} linkFlag={true} />
        <div className={styles.screenContent}>
          <form className={styles.form} onSubmit={submitHandler}>
            {habit.map((q) => (
              <div key={q.qID} className={styles.question}>
                <label>{q.question}</label>
                {/* <input
                  type="hidden"
                  name="ans"
                  id={`q${q.qID}`}
                  value={answer[q.qID - 1]}
                /> */}
                {q.options.map((option) => (
                  <label
                    key={option.id}
                    className={
                      answer.includes(option.value) == true
                        ? styles.option_active
                        : styles.option
                    }
                  >
                    <input
                      type="checkbox"
                      name={'stuAnswer' + q.qID}
                      value={option.value}
                      onChange={(e) => selectedChange(e.target.value)}
                      checked={answer.includes(option.value) == true}
                    />
                    {option.option}
                  </label>
                ))}
              </div>
            ))}
            <div className={styles.buttonArea}>
              <Button title={'開始點餐'} type="submit"></Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default HabitSetting;
