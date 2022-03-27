import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './styles.module.scss';
import path from '../../utils/path';
import NavigationBar from '../../components/NavigationBar';
import foodIntro from '../../assets/json/foodIntro.json';

const FoodDetail = () => {
  const location = useLocation();
  const foodTitle = location.state?.foodTitle;
  const foodDetail = foodIntro.filter((x) => x.foodTitle == foodTitle)[0];
  useEffect(() => {
    console.log(JSON.stringify(foodDetail));
    console.log(foodDetail.foodCookTime);
  }, []);
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>aaa</title>
        <meta name="description" content="aaa" />
      </Helmet>
      <div className={styles.screen}>
        <NavigationBar title={foodTitle} link={path.order} linkFlag={true} />
        <div className={styles.screenContent}>
          <div className={styles.mainArea}>
            <div className={styles.foodImgArea}>
              <img
                className={styles.foodImgArea_img}
                src={foodDetail.foodImg}
              />
            </div>
            <div className={styles.foodDetailArea}>
              <div>份量：{foodDetail.foodSize}</div>
              <div className={styles.foodDetailArea_foodCookTime}>
                建議燒烤時間：{foodDetail.foodCookTime}
              </div>
              <div>原產地：{foodDetail.foodLocation}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default FoodDetail;
