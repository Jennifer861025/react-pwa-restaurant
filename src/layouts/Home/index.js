import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import { getToken } from '../../store/action';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import homeImg1 from '../../assets/image/homeImg1.png';
import homeImg2 from '../../assets/image/homeImg2.png';

const Home = () => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>首頁</title>
        <meta name="description" content="首頁" />
      </Helmet>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <Header />
          <div className={styles.content}>
            <div className={styles.content_content}>
              <div className={styles.imgArea}>
                <img src={homeImg1} className={styles.img}></img>
              </div>
              <div>
                <div className={styles.title}>我們的堅持</div>
                <div className={styles.description}>
                  XRestsursnt
                  秉持著創業的初衷，致力於帶給顧客快樂的享受，店內所有食材皆是當日現採的，讓顧客吃得新鮮吃得快樂，食物的安全我們都有把關，請各位放心！絕對給顧客最新鮮最道地最美味的饗食體驗！
                </div>
              </div>
            </div>
            <div className={styles.content_content}>
              <div>
                <div className={styles.title}>關於XRestaurant</div>
                <div className={styles.description}>
                  本店至2010年創立於台北市和平東路三段，至今已十二年的時間，並且在期間開設了五家分店，透過網路的行銷，逐漸在燒烤美食圈打出自己的名號，期望在未來繼續帶給大家美味的食物！
                </div>
              </div>
              <div className={styles.imgArea}>
                <img src={homeImg2} className={styles.img}></img>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
