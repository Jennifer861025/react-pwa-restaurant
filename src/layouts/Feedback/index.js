import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import feedback from '../../assets/json/feedback.json';

const Feedback = () => {
  const history = useHistory();
  const [answer, setAnswer] = useState([]);
  const [stuAns, setStuAns] = useState(0);
  const [flag, setFlag] = useState(false);
  const [stuSelected, setStuSelected] = useState('');

  const submitHandler = () => {
    localStorage.setItem('feedbackFinish', true);
    history.push(path.checkoutOptions);
  };

  const selectedChange = (e) => {
    console.log(e);
    const n = parseInt(e.slice(0, e.search(/-/i))) - 1;
    setStuAns(n);
    setFlag(true);
    setStuSelected(e);
  };

  useEffect(() => {
    if (flag) {
      const newAnswer = [...answer];
      newAnswer[stuAns] = stuSelected;
      setAnswer(newAnswer);
      setFlag(false);
    }
    console.log(answer);
  }, [flag]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>用餐意見回饋</title>
        <meta name="description" content="用餐意見回饋" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'用餐意見回饋'}
          link={path.checkout}
          linkFlag={true}
        />
        <div className={styles.screenContent}>
          <form className={styles.form} onSubmit={submitHandler}>
            {feedback.map((q) => (
              <div key={q.qID} className={styles.question}>
                <label>{q.question}</label>
                <input
                  type="hidden"
                  name="ans"
                  id={`q${q.qID}`}
                  value={answer[q.qID - 1]}
                />
                {q.options.map((option) => (
                  <label
                    key={option.id}
                    className={
                      answer[q.qID - 1] == q.qID + '-' + option.id
                        ? styles.option_active
                        : styles.option
                    }
                  >
                    <input
                      type="radio"
                      name={'stuAnswer' + q.qID}
                      value={q.qID + '-' + option.id}
                      onChange={(e) => selectedChange(e.target.value)}
                      checked={answer[q.qID - 1] == q.qID + '-' + option.id}
                    />
                    {option.option}
                  </label>
                ))}
              </div>
            ))}
            <div className={styles.buttonArea}>
              <Button title="送出" type="submit"></Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Feedback;
