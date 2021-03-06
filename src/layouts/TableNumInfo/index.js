import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';

const TableNumInfo = () => {
  // const history = useHistory();
  const tableNum = JSON.parse(localStorage.getItem('reservationData')).tableNum;
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>桌號資訊</title>
        <meta name="description" content="桌號資訊" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'桌號資訊'} linkFlag={false} />
        <div className={styles.screenContent}>
          <div className={styles.incTitle}>XRestaurant 國北店</div>
          <div className={styles.tableInfoArea}>
            <div className={styles.tableInfo_title}>您的餐桌編號</div>
            <div className={styles.tableInfo_number}>{tableNum}</div>
            <div className={styles.tableInfo_memo}>請稍候</div>
            <div>將由服務人員進行帶位</div>
            <Link to={`${path.menu}?canChoose=true`}>
              <Button title={'進入點餐'} marginTop={true} main={false}></Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default TableNumInfo;
