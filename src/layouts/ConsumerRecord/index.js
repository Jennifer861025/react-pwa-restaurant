import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const ConsumerRecord = () => {
  const a = '3/12';
  const b = 499;
  const c = 1497;
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
            <div
              className={styles.record}
            >{`${a} ${b}方案 消費金額${c}元`}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ConsumerRecord;
