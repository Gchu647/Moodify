import React from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const NoPreviewModal = props => {
  const {
    showModal,
    close,
    exterURL
  } = props;

  return(
    <Modal size='xs' show={showModal} onHide={close}>
      <Modal.Body>
        <p>Spotify does not support previewing this song.</p>
        <p>{ exterURL && (<a href={exterURL} target='_blank' rel='noopener noreferrer'>Click here </a>) } 
          to listen to the song on Spotify</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} appearance="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NoPreviewModal;