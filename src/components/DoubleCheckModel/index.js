import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoubleCheckModel = (prop) => {
  const {
    show,
    closeHandler,
    modalTitle,
    modalBody,
    leftBtnHandler,
    leftBtnTitle,
    rightBtnHandler,
    rightBtnTitle,
  } = prop;
  return (
    <Modal show={show} onHide={closeHandler} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={leftBtnHandler}>
          {leftBtnTitle}
        </Button>
        <Button variant="primary" onClick={rightBtnHandler}>
          {rightBtnTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DoubleCheckModel;
