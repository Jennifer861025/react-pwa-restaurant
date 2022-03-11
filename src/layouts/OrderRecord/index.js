import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const OrderRecord = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>點餐記錄</title>
        <meta name="description" content="點餐記錄" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'點餐記錄'} link={path.order} linkFlag={true} />
        <div className={styles.screenContent}>
          <div className={styles.mainArea}>
            <div className={styles.orderArea}>
              <div>餐點正在準備中：</div>
              <div className={styles.orderArea_detailArea}>
                <div className={styles.detailArea_detail}>
                  <div>照燒牛</div>
                  <div className={styles.detail_number}>X2</div>
                </div>
                <div className={styles.detailArea_detail}>
                  <div>梅花豬</div>
                  <div className={styles.detail_number}>X2</div>
                </div>
              </div>
            </div>
            <div className={styles.orderArea}>
              <div>餐點已送達：</div>
              <div className={styles.orderArea_detailArea}>
                <div className={styles.detailArea_detail}>
                  <div>照燒牛</div>
                  <div className={styles.detail_number}>X2</div>
                </div>
                <div className={styles.detailArea_detail}>
                  <div>梅花豬</div>
                  <div className={styles.detail_number}>X2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default OrderRecord;
