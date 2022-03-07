import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import TabBar from '../../components/TabBar';

const Order = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>點餐</title>
        <meta name="description" content="點餐" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'點餐'}
          linkFlag={false}
          rightLink={path.order}
          rightLinkFlag={true}
        />
        <TabBar order={true} />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default Order;
