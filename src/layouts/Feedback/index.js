import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const Feedback = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>用餐意見回饋</title>
        <meta name="description" content="用餐意見回饋" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar
          title={'用餐意見回饋'}
          line={path.checkout}
          linkFlag={false}
        />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default Feedback;
