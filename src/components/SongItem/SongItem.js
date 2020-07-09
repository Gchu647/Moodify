import React from 'react';
import './SongItem.css';
import PlayButton from '../PlayButton/PlayButton';

const SongItem = props => {
  const {
    songName,
    songAudio,
    artists, 
    albumImage,
    moodScore, 
    audioControl
  } = props;
  
  let sectionStyle = {
    width: '100%',
    height: '191px',
    backgroundImage: `url(${albumImage})`,
    backgroundSize: 'contain',
    backgroundColor: 'yellow'
  };

  return (
    <div className='song-container'>
      {/* {console.log('songItem: ', songName, moodScore)} */}
      <div className='album-image' style={sectionStyle}>
		    <div className='song-score-container'>
          <p className='song-score'>{moodScore}</p>
		    </div>
	    </div>
      <div className='song-container-bottom'>
        <div className='song-container-bottom-left'>
          {/* Make the songName shorter! */}
          <p className='song-title'>{songName}</p>
          <p className='song-artists'>{artists}</p>
        </div>
        <div className='song-container-bottom-right'>
          <PlayButton 
            audioControl={audioControl} 
            songAudio={songAudio}
            songName={songName} // TESTING
          />
        </div>
      </div>
    </div>
  );
}

export default SongItem;