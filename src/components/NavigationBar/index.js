import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faList } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = (prop) => {
  const {
    title,
    link,
    linkFlag = false,
    rightLink,
    rightLinkFlag = false,
    back = false,
  } = prop;
  return (
    <div className={styles.container}>
      <div className={styles.phoneTopSpace}></div>
      <div className={styles.navigationBar}>
        <div className={styles.navigationBar_side}>
          <Link
            to={{ pathname: link, state: { back: back } }}
            className={
              linkFlag ? styles.leftSide_icon : styles.leftSide_iconHide
            }
          >
            <FontAwesomeIcon icon={faPlay} />
          </Link>
        </div>
        <div className={styles.navigationBar_side}>{title}</div>
        <div className={styles.navigationBar_side}>
          <Link
            to={rightLink}
            className={
              rightLinkFlag ? styles.rightSide_icon : styles.rightSide_iconHide
            }
          >
            <FontAwesomeIcon icon={faList} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
