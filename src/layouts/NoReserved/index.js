import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { useHistory } from 'react-router';
import { StoreContext } from '../../store/reducer';
import { getUser, getWaitList, setWaitList } from '../../store/action';

const NoReserved = () => {
  const {
    state: {
      waitData: { waitNum, waitLastNum },
      requestdata: { error, loading },
    },
    dispatch,
  } = useContext(StoreContext);
  const history = useHistory();
  const [name, setName] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [peopleNum, setPeopleNum] = useState(1);
  const [getUserFlag, setGetUserFlag] = useState(false);
  const waitTime = waitNum * 15;

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setGetUserFlag(false);
    if (name == null) {
      alert('請輸入姓名');
    } else if (phoneNum == null) {
      alert('請輸入電話號碼');
    } else {
      await getUser(dispatch, { phone: phoneNum, name: name });
      setGetUserFlag(true);
    }
  };

  useEffect(() => {
    if (getUserFlag == true) {
      if (error == true) {
        setGetUserFlag(false);
      } else {
        setWaitList({
          waitLastNum: waitLastNum,
          name: name,
          phone: phoneNum,
          date: `${year}-${month}-${day}`,
          peopleNum: peopleNum,
        });
        localStorage.setItem('phone', phoneNum);
        history.push(path.waiting);
      }
    }
  }, [getUserFlag, error]);

  const minusHandler = () => {
    if (peopleNum == 1) {
      setPeopleNum(1);
    } else {
      setPeopleNum(peopleNum - 1);
    }
  };
  const plusHandler = () => {
    setPeopleNum(peopleNum + 1);
  };

  useEffect(() => {
    getWaitList(dispatch);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>登記候位</title>
            <meta name="description" content="登記候位" />
          </Helmet>
          <div className={styles.screen}>
            <NavigationBar
              title={'登記候位'}
              link={path.bookingConfirm}
              linkFlag={true}
            />
            <div className={styles.screenContent}>
              <div className={styles.top}>XRestaurant 國北店</div>
              <div className={styles.waitingInfo}>
                目前尚有 {waitNum} 組在等候
              </div>
              <div>* 預計等候 {waitTime} 分鐘 *</div>
              <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.form_inputArea}>
                  <label>姓名</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.form_inputArea}>
                  <label>電話號碼</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setPhoneNum(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.form_inputArea}>
                  <label>用餐人數</label>
                  <div className={styles.form_numberArea}>
                    <button
                      type="button"
                      className={styles.numberControl_btn}
                      onClick={minusHandler}
                    >
                      -
                    </button>
                    <div className={styles.numberControl_number}>
                      {peopleNum}
                    </div>
                    <button
                      type="button"
                      className={styles.numberControl_btn}
                      onClick={plusHandler}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.button}>
                  <Button
                    type="submit"
                    title={'送出'}
                    marginTop={true}
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default NoReserved;
