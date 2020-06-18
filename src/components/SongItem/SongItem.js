import React from 'react';
import './SongItem.css'

const SongItem = props => {
  return (
    <div className='song-container'>
      <div className='album-image' style={sectionStyle}>
		    <div className='song-score-container'>
			    <p className='song-score'> 85</p>
		    </div>
	    </div>
      <div className='song-container-bottom'>
        <div className='song-container-bottom-left'>
          <p className='song-title'>Falling</p>
          <p className='song-artists'>Travor Daniel</p>
        </div>
        <div className='song-container-bottom-right'>
          <i class="fa fa-play-circle" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}
var bgUrl = 'https://i.scdn.co/image/ab67616d00001e02bf01fd0986a195d485922167';

var sectionStyle = {
  width: '100%',
  height: '221px',
  backgroundImage: `url(${bgUrl})`,
  backgroundSize: 'contain',
  backgroundColor: 'yellow'
};

export default SongItem;