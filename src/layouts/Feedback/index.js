import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import feedback from '../../assets/json/feedback.json';
import DoubleCheckModel from '../../components/DoubleCheckModel';
import { setCoupon } from '../../store/action';

const Feedback = () => {
  const history = useHistory();
  const [answer, setAnswer] = useState([]);
  const [stuAns, setStuAns] = useState(0);
  const [flag, setFlag] = useState(false);
  const [stuSelected, setStuSelected] = useState('');
  const [doubleCheckShow, setDoubleCheckShow] = useState(false);
  const phone = localStorage.getItem('phone');

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 3;
  var day = date.getDate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (answer.length == feedback.length) {
      setDoubleCheckShow(true);
      setCoupon({
        phone: phone,
        couponValue: 50,
        deadline: `${year}-${month}-${day}`,
      });
    } else {
      alert('尚有問題未作答喔!');
    }
  };

  const selectedChange = (e) => {
    console.log(e);
    const n = parseInt(e.slice(0, e.search(/-/i))) - 1;
    setStuAns(n);
    setFlag(true);
    setStuSelected(e);
  };

  const leftBtnHandler = () => {
    localStorage.setItem('feedbackFinish', true);
    history.push(path.checkout);
  };

  const rightBtnHandler = () => {
    localStorage.setItem('feedbackFinish', true);
    localStorage.setItem('couponLastPage', 'feedback');
    history.push(path.coupon);
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
      <DoubleCheckModel
        show={doubleCheckShow}
        closeHandler={() => setDoubleCheckShow(false)}
        modalTitle={'恭喜您獲得50元折價券'}
        modalBody={
          '感謝您的用餐回饋，我們將發送優惠券給您，您可以到優惠券專區查看，或者返回結帳頁面'
        }
        leftBtnTitle={'返回'}
        leftBtnHandler={leftBtnHandler}
        rightBtnTitle={'查看優惠券'}
        rightBtnHandler={rightBtnHandler}
      />
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
