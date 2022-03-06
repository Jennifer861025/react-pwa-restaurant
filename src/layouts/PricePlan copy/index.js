import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const PricePlan = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>價格方案</title>
        <meta name="description" content="價格方案" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'方案'} link={path.menu} linkFlag={true} />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default PricePlan;
