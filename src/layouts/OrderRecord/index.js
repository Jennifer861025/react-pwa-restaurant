import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const OrderRecord = () => {
  const history = useHistory();
  const orderDetail = JSON.parse(localStorage.getItem('orderDetail'));
  const allOrderDetail = JSON.parse(localStorage.getItem('allOrderDetail'));

  const time = orderDetail.length * 8;

  useEffect(() => {
    localStorage.setItem('foodDetailFlag', JSON.stringify(true));
  }, []);

  //食材資訊
  const FoodDetailHandler = (optionTitle) => {
    const location = {
      pathname: path.foodDetail,
      state: { foodTitle: optionTitle },
    };
    history.push(location);
  };

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
              {orderDetail.length == 0 ? (
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
              <div
                className={
                  orderDetail.length !== 0
                    ? styles.orderArea_time
                    : styles.orderArea_time_hide
                }
              >
                <div>＊&ensp;預計送達時間：</div>
                <div className={styles.time}>{time}分鐘 </div>
                <div>&ensp;＊</div>
              </div>
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
                      <div
                        className={styles.optionDetail}
                        onClick={() => FoodDetailHandler(all.option)}
                      >
                        <div className={styles.optionIntroIcon}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </div>
                        <div>{all.option}</div>
                      </div>
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
