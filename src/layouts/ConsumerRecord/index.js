import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import record from '../../assets/json/record.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const ConsumerRecord = () => {
  const history = useHistory();
  const recordClickHandler = (id) => {
    console.log(id);
    history.push(`${path.consumerRecord}/recordInfo`);
  };
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>消費記錄</title>
        <meta name="description" content="消費記錄" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'消費記錄'} link={path.member} linkFlag={true} />
        <div className={styles.screenContent}>
          <div className={styles.recordArea}>
            <div className={styles.recordArea_year}>
              <div>2022年</div>
              <div className={styles.recordArea_year_line}></div>
            </div>
            {record.map((record) => (
              <div
                className={styles.record}
                key={record.id}
                onClick={() => recordClickHandler(record.id)}
              >
                <div>{record.date}</div>
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
    </Fragment>
  );
};
export default ConsumerRecord;
