import React from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
// import './WelcomeModal.css';

const WelcomeModal = props => {
  const {
    showModal,
    close,
  } = props;

  return(
    <div className='welcome-modal'>
      <Modal size='md' show={showModal} onHide={close}>
      <Modal.Body>
        <p>Welcome Modal smoke test.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} appearance="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default WelcomeModal;