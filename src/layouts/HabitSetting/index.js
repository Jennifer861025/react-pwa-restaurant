import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';

const HabitSetting = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>偏好設定</title>
        <meta name="description" content="偏好設定" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'偏好設定'} link={path.member} linkFlag={true} />
        <div className={styles.screenContent}></div>
      </div>
    </Fragment>
  );
};
export default HabitSetting;
