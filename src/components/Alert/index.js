import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Alert = (prop) => {
  const { text, onHide } = prop;
  return (
    <Modal {...prop} centered>
      <Modal.Body>
        <h4>{text}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" size="sm" onClick={onHide}>
          確認
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Alert;
