import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import path from '../../utils/path';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faList } from '@fortawesome/free-solid-svg-icons';

const TabBar = (prop) => {
  const { checkout = false, order = false, member = false } = prop;
  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <Link
          to={path.checkout}
          className={checkout ? styles.tabBar_tab_active : styles.tabBar_tab}
        >
          結帳
        </Link>
        <Link
          to={path.order}
          className={order ? styles.tabBar_tab_active : styles.tabBar_tab}
        >
          點餐
        </Link>
        <Link
          to={path.member}
          className={member ? styles.tabBar_tab_active : styles.tabBar_tab}
        >
          會員
        </Link>
      </div>
    </div>
  );
};
export default TabBar;
