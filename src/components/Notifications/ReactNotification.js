import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

const ReactNotificationComponent = ({ title, body }) => {
  let hideNotif = title === '';

  if (!hideNotif) {
    toast.info(<Display />);
  }

  function Display() {
    return (
      <div className={styles.notifStyles}>
        <h4 className={styles.h4Styles}>{title}</h4>
        <p className={styles.pStyles}>{body}</p>
      </div>
    );
  }

  return (
    <ToastContainer
      position="top-center"
      autoClose={8000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  );
};

ReactNotificationComponent.defaultProps = {
  title: 'This is title',
  body: 'Some body',
};

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default ReactNotificationComponent;
