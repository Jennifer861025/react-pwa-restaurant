import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const CheckoutOptions = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>結帳選擇</title>
        <meta name="description" content="結帳選擇" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'結帳選擇'}
          link={path.feedback}
          linkFlag={true}
        />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default CheckoutOptions;
