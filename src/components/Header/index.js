import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import Weblogo from '../../assets/image/Weblogo.png';
import path from '../../utils/path';

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to={path.home}>
          <div className={styles.header_leftSide}>
            <div className={styles.logoSide}>
              <img src={Weblogo} className={styles.logo}></img>
            </div>
            <div>XRestaurant</div>
          </div>
        </Link>
        <div className={styles.header_rightSide}>
          <div className={styles.header_link}>最新消息</div>
          <Link to={path.reservation}>
            <div className={styles.header_link}>線上訂位</div>
          </Link>
          <div className={styles.header_link}>會員專區</div>
          <div className={styles.header_link}>聯絡我們</div>
        </div>
      </header>
    </div>
  );
};

export default Header;
