import React from 'react';
import './SongItem.css'

const SongItem = props => {
  const {
    songName,
    artists, 
    albumImage, 
    audioControl
  } = props;
  
  let sectionStyle = {
    width: '100%',
    height: '221px',
    backgroundImage: `url(${albumImage})`,
    backgroundSize: 'contain',
    backgroundColor: 'yellow'
  };

  return (
    <div className='song-container'>
      {console.log(songName, albumImage)}
      <div className='album-image' style={sectionStyle}>
		    <div className='song-score-container'>
			    <p className='song-score'> 85</p>
		    </div>
	    </div>
      <div className='song-container-bottom'>
        <div className='song-container-bottom-left'>
          {/* Make the songName shorter! */}
          <p className='song-title'>{songName}</p>
          <p className='song-artists'>{artists}</p>
        </div>
        <div className='song-container-bottom-right'>
          <i class="fa fa-play-circle" aria-hidden="true" onClick={audioControl}></i>
        </div>
      </div>
    </div>
  );
}

export default SongItem;