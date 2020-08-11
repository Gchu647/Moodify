import React, {useState, useEffect} from 'react';
import './PlayButton.css';
import NoPreviewModal from '../NoPreviewModal/NoPreviewModal';

const PlayButton = (props) => {
  /******** State Variables ********/
  const [showModal, setShowModal] = useState(false);

  /******** Props Variables ********/
  const {
    songIsPlaying,
    songIdPlaying,
    songIdClicked,
    audioLink,
    audioControl,
    exterURL
  } = props;

  /******** Functions ********/
  const close = () => {
    setShowModal(false); // closes NoPreviewModal
  }

  const open = () => {
    setShowModal(true); // opens NoPreviewModal
  }

  const audioButton = () => {
    if(songIsPlaying && (songIdPlaying === songIdClicked)) {
      return (<i className="material-icons" onClick={handleClick}>stop</i>);
    } else {
      return (<i className="material-icons" onClick={handleClick}>play_arrow</i>);
    }
  }

  const handleClick = () => {
    if(audioLink) {
      audioControl(audioLink, songIdClicked); // call on the audioControl in MainSection
    } else {
      open();
    }
  }

  return(
    <div>
      <div className="audio-button ">
        {audioButton()}
      </div>
      <NoPreviewModal 
        showModal={showModal}
        close={close}
        exterURL={exterURL}
      />
    </div>
  );
}

export default PlayButton;