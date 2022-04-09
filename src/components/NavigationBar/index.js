import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import record from '../../assets/image/record.png';

const NavigationBar = (prop) => {
  const {
    title,
    link,
    linkFlag = false,
    rightLink,
    rightLinkFlag = false,
    tableNumFlag = false,
    tableNum,
  } = prop;
  return (
    <div className={styles.container}>
      <div className={styles.phoneTopSpace}></div>
      <div className={styles.navigationBar}>
        <div className={styles.navigationBar_side}>
          <Link
            to={link}
            className={
              linkFlag ? styles.leftSide_icon : styles.leftSide_iconHide
            }
          >
            <FontAwesomeIcon icon={faPlay} />
          </Link>
        </div>
        <div className={styles.navigationBar_side}>
          <div
            className={
              tableNumFlag == true ? styles.tableNum : styles.tableNum_hide
            }
          >
            {tableNum}
          </div>
          <div>{title}</div>
        </div>
        <div className={styles.navigationBar_side}>
          <Link
            to={rightLink}
            className={
              rightLinkFlag ? styles.rightSide_icon : styles.rightSide_iconHide
            }
          >
            {/* <FontAwesomeIcon icon={faList} /> */}
            <div>
              <img src={record}></img>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
