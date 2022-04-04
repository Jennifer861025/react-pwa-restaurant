import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const RecordData = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>消費記錄資訊</title>
        <meta name="description" content="消費記錄資訊" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'消費記錄資訊'}
          link={path.consumerRecord}
          linkFlag={true}
        />
        <div className={styles.screenContent}>
          <div className={styles.mainArea}>
            <div className={styles.recordArea}>
              <div>當日選擇的食材：</div>
              <div className={styles.recordArea_infoArea}>
                <div className={styles.recordArea_info}>
                  <div>蝦子</div>
                  <div className={styles.record_number}>X6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default RecordData;
