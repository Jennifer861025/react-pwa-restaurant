import React, { Fragment, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import * as QueryString from 'query-string';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Loading from '../../components/Loading';
import { StoreContext } from '../../store/reducer';
import { getUserHistoryDetail } from '../../store/action';

const RecordData = () => {
  const {
    state: {
      historyDetail: {
        allOrderDetail,
        date,
        peopleNum,
        pricePlan,
        // tableNum,
        totalPrice,
      },
      requestdata: { loading },
    },
    dispatch,
  } = useContext(StoreContext);
  const location = useLocation();
  const { id } = QueryString.parse(location.search);
  const phone = localStorage.getItem('phone');

  useEffect(() => {
    console.log(id);
    getUserHistoryDetail(dispatch, { phone: phone, historyId: id });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>消費記錄資訊</title>
            <meta name="description" content="消費記錄資訊" />
          </Helmet>
          <div className={styles.screen}>
            <NavigationBar
              title={date}
              link={path.consumerRecord}
              linkFlag={true}
            />
            <div className={styles.screenContent}>
              <div className={styles.mainArea}>
                <div className={styles.recordArea}>
                  <div>當日用餐資訊：</div>
                  <div
                    className={`${styles.recordArea_infoArea} ${styles.recordArea_infoArea_detail}`}
                  >
                    <div
                      className={`${styles.recordArea_info} ${styles.recordArea_info_detail}`}
                    >
                      <div className={styles.detail}>用餐日期：{date}</div>
                      <div className={styles.detail}>
                        用餐人數：{peopleNum}人
                      </div>
                      <div className={styles.detail}>
                        用餐方案：{pricePlan}方案
                      </div>
                      <div className={styles.detail}>
                        用餐金額：{totalPrice}元
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.recordArea}>
                  <div>當日選擇的食材：</div>
                  {allOrderDetail.length == 0 ? (
                    <div className={styles.recordArea_infoArea}>
                      <div className={styles.recordArea_info}>
                        當日尚未選擇任何食材
                      </div>
                    </div>
                  ) : (
                    <div className={styles.recordArea_infoArea}>
                      {allOrderDetail.map((order) => (
                        <div className={styles.recordArea_info} key={order}>
                          <div>{order.option}</div>
                          <div className={styles.record_number}>
                            X{order.number}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default RecordData;
