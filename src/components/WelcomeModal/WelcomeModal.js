import React from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import './WelcomeModal.css';

const WelcomeModal = props => {
  const {
    showModal,
    close,
  } = props;

  return(
    <Modal size='md' show={showModal} onHide={close}>
      <div className='welcome-modal-content'>
        <Modal.Body>
          <h3>Welcome to Moodify!</h3>
          <p>We recommend you popular songs from the <a href='https://www.billboard.com/charts/the-billboard-hot-100' target='_blank'>Billboard Hot 100</a> based on your mood. </p> 
          <p>Each song is scored on a scale of 0 to 100 using the <a href='https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/' target='_blank'>the Spotify API</a>, with 0 being very sad, and 100 being very happy.</p>
          <p>This app only shows song previews, so if you like a song, then you will have to listen to the full length version on either Spotify or Youtube.</p>
          <p>P.S: The filter features on the left doesn't work when you are searching.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} appearance="primary">
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default WelcomeModal;