import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
// import plan499 from '../../assets/image/499Plan.png';
// import plan699 from '../../assets/image/699Plan.png';
// import plan899 from '../../assets/image/899Plan.png';

const PricePlan = () => {
  const location = useLocation();
  const back = location.state?.back;
  const price = location.state?.price;
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
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default PricePlan;
