import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as QueryString from 'query-string';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import plan499 from '../../assets/image/499Plan.png';
import plan699 from '../../assets/image/699Plan.png';
import plan899 from '../../assets/image/899Plan.png';

const Menu = () => {
  const location = useLocation();
  const history = useHistory();
  const { canChoose } = QueryString.parse(location.search);
  const tableNum = JSON.parse(localStorage.getItem('reservationData')).tableNum;
  const pricePlanFlag = localStorage.getItem('pricePlanFlag')
    ? JSON.parse(localStorage.getItem('pricePlanFlag'))
    : false;
  const mealHabitsFlag = localStorage.getItem('mealHabits')
    ? JSON.parse(localStorage.getItem('mealHabitsFlag'))
    : false;
  useEffect(() => {
    if (pricePlanFlag == true) {
      if (mealHabitsFlag == true) {
        history.push(path.order);
      } else {
        history.push(path.mealHabits);
      }
    }
  }, []);
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>查看菜單</title>
        <meta name="description" content="菜單" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'查看菜單'}
          link={path.waiting}
          linkFlag={canChoose == 'true' ? false : true}
        />
        <div className={styles.screenContent}>
          <div className={styles.tableNum}>桌號：{tableNum}桌</div>
          <div className={styles.planArea}>
            <Link to={`${path.pricePlan}?canChoose=${canChoose}&price=499`}>
              <div className={styles.imgArea}>
                <img src={plan499}></img>
              </div>
            </Link>
            <Link to={`${path.pricePlan}?canChoose=${canChoose}&price=699`}>
              <div className={styles.imgArea}>
                <img src={plan699}></img>
              </div>
            </Link>
            <Link to={`${path.pricePlan}?canChoose=${canChoose}&price=899`}>
              <div className={styles.imgArea}>
                <img src={plan899}></img>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Menu;
