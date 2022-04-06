import React from 'react';
// import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Button = (prop) => {
  const {
    title,
    main = true,
    marginTop = false,
    onClickHandler,
    disable = false,
  } = prop;
  return (
    <button
      className={
        main
          ? `${styles.button} ${marginTop ? styles.marginTop : ''} ${
              disable ? styles.disable : ''
            }`
          : `${styles.button_secondary} ${marginTop ? styles.marginTop : ''} ${
              disable ? styles.disable : ''
            }`
      }
      onClick={onClickHandler}
      disabled={disable ? 'disabled' : ''}
    >
      {title}
    </button>
  );
};
export default Button;
