import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const OrderRecord = () => {
  const orderDetail = JSON.parse(localStorage.getItem('orderDetail'));
  const allOrderDetail = JSON.parse(localStorage.getItem('allOrderDetail'));
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
              {orderDetail == null ? (
                <div className={styles.orderArea_detailArea_null}>
                  目前尚未有準備中的餐點！
                </div>
              ) : (
                <div className={styles.orderArea_detailArea}>
                  {orderDetail.map((prepare) => (
                    <div key={prepare} className={styles.detailArea_detail}>
                      <div>{prepare.option}</div>
                      <div className={styles.detail_number}>
                        X{prepare.number}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.orderArea}>
              <div>餐點已送達：</div>
              {allOrderDetail == null ? (
                <div className={styles.orderArea_detailArea_null}>
                  目前尚未有已送達的餐點！
                </div>
              ) : (
                <div className={styles.orderArea_detailArea}>
                  {allOrderDetail.map((all) => (
                    <div key={all} className={styles.detailArea_detail}>
                      <div>{all.option}</div>
                      <div className={styles.detail_number}>X{all.number}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default OrderRecord;
