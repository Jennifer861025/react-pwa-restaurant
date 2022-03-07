import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';
import plan499 from '../../assets/image/499Plan.png';
import plan699 from '../../assets/image/699Plan.png';
import plan899 from '../../assets/image/899Plan.png';

const PricePlan = () => {
  const location = useLocation();
  const history = useHistory();
  const back = location.state?.back;
  const price = location.state?.price;
  const submitHandler = () => {
    console.log('price ' + price);
    history.push(path.mealHabits);
  };
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{price + '方案'}</title>
        <meta name="description" content="價格方案" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={price + '方案'}
          link={path.menu}
          linkFlag={true}
          back={back}
        />
        <div className={styles.screenContent}>
          <div className={styles.pricePlanImg}>
            {price === 499 ? <img src={plan499}></img> : <></>}
            {price === 699 ? <img src={plan699}></img> : <></>}
            {price === 899 ? <img src={plan899}></img> : <></>}
          </div>
          <Button
            title={'選擇此方案'}
            marginTop={true}
            onClickHandler={submitHandler}
          ></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default PricePlan;
