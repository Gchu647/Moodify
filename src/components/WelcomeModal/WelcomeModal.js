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
          <p>This app uitilizes the <a href='https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/' target='_blank'>Spotify API</a> to recommend music to you based on your mood. </p>
          <p>The songs recommended are scored from a scale of 0 to 100, with 0 being very sad, and 100 being very happy.</p>
          <p>You can also search up songs or artists you know to check out their mood scores.</p>
          <p>This app only shows song previews, so if you like a song, then you will have to listen to the full length song on either Spotify or Youtube.</p>
          <p>P.S: The filter features on the left doesn't work in search</p>
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