import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import plan499 from '../../assets/image/499Plan.png';
import plan699 from '../../assets/image/699Plan.png';
import plan899 from '../../assets/image/899Plan.png';

const Menu = () => {
  const location = useLocation();
  const back = location.state?.back;
  useEffect(() => {
    console.log('choose ' + back);
  }, []);
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>菜單</title>
        <meta name="description" content="菜單" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'菜單'}
          link={path.waiting}
          linkFlag={back ? true : false}
        />
        <div className={styles.screenContent}>
          <div className={styles.planArea}>
            <Link
              to={{
                pathname: path.pricePlan,
                state: { back: back, price: 499 },
              }}
            >
              <div className={styles.imgArea}>
                <img src={plan499}></img>
              </div>
            </Link>
            <Link
              to={{
                pathname: path.pricePlan,
                state: { back: back, price: 699 },
              }}
            >
              <div className={styles.imgArea}>
                <img src={plan699}></img>
              </div>
            </Link>
            <Link
              to={{
                pathname: path.pricePlan,
                state: { back: back, price: 899 },
              }}
            >
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
