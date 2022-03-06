import React from 'react';
// import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Button = (prop) => {
  const { title, main = true, marginTop = false } = prop;
  return (
    <button
      className={
        main
          ? `${styles.button} ${marginTop ? styles.marginTop : ''}`
          : `${styles.button_secondary} ${marginTop ? styles.marginTop : ''}`
      }
    >
      {title}
    </button>
  );
};
export default Button;
