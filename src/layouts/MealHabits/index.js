import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import Button from '../../components/Button';

const MealHabits = () => {
  const history = useHistory();
  const submitHandler = () => {
    history.push(path.order);
  };
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>用餐偏好</title>
        <meta name="description" content="用餐偏好" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={'用餐偏好'} linkFlag={false} />
        <div className={styles.screenContent}>
          <Button
            title={'開始點餐'}
            marginTop={true}
            onClickHandler={submitHandler}
          ></Button>
        </div>
      </div>
    </Fragment>
  );
};
export default MealHabits;
