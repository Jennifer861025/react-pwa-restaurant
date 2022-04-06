import React, { Fragment, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Loading from '../../components/Loading';
// import record from '../../assets/json/record.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../store/reducer';
import { getUserHistory } from '../../store/action';

const ConsumerRecord = () => {
  const {
    state: {
      userHistory,
      requestdata: { loading },
    },
    dispatch,
  } = useContext(StoreContext);
  const history = useHistory();
  const phone = localStorage.getItem('phone');

  const recordClickHandler = (id) => {
    console.log(id);
    history.push(`${path.consumerRecord}/recordInfo?id=${id}`);
  };

  useEffect(() => {
    getUserHistory(dispatch, { phone: phone });
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(userHistory));
  }, [userHistory]);

  const dateSetting = (date) => {
    return date.slice(5, 10);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>消費記錄</title>
            <meta name="description" content="消費記錄" />
          </Helmet>
          <div className={styles.screen}>
            <NavigationBar
              title={'消費記錄'}
              link={path.member}
              linkFlag={true}
            />
            <div className={styles.screenContent}>
              <div className={styles.recordArea}>
                {userHistory.length == 0 ? (
                  <div>目前尚未有消費紀錄</div>
                ) : (
                  <div className={styles.recordArea_year}>
                    <div>2022年</div>
                    <div className={styles.recordArea_year_line}></div>
                  </div>
                )}

                {userHistory.map((record) => (
                  <div
                    className={styles.record}
                    key={record.id}
                    onClick={() => recordClickHandler(record.id)}
                  >
                    <div>{dateSetting(record.date)}</div>
                    <div>{record.pricePlan}方案</div>
                    <div>消費${record.totalPrice}元</div>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faClipboardList} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default ConsumerRecord;
