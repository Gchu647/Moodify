import React from 'react';
import './SongItem.css';
import PlayButton from '../PlayButton/PlayButton';

const SongItem = props => {
  const {
    song,
    exterURL, 
    audioControl,
    songIsPlaying
  } = props;
  
  let sectionStyle = {
    width: '100%',
    height: '191px',
    backgroundImage: `url(${song.album_image})`,
    backgroundSize: 'contain',
    backgroundColor: '#3498ff',
    marginBottom: '15px'
  };

  return (
    <div className='song-container'>
      <div className='album-image' style={sectionStyle}>
		    <div className='song-score-container'>
          <p className='song-score'>{song.moodScore}</p>
		    </div>
	    </div>
      <div className='song-container-bottom'>
        <div className='song-container-bottom-left'>
          <p className='song-title'>{song.name}</p>
          <p className='song-artists'>{song.artists}</p>
        </div>
        <div className='song-container-bottom-right'>
          <PlayButton 
            audioControl={audioControl} 
            audioLink={song.song_audio}
            exterURL={exterURL}
          />
        </div>
      </div>
    </div>
  );
}

export default SongItem;