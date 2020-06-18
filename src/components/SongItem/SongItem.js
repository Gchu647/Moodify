import React from 'react';

const SongItem = props => {
  return (
    <div className='song-container'>
      <div className='album-image' style={sectionStyle}>
		    <div className='song-score-container'>
			    <p className='song-score'> 85</p>
		    </div>
	    </div>
      <p className='song-title'>Falling</p>
      <p className='song-artists'>Travor Daniel</p>
    </div>
  );
}
var bgUrl = 'https://i.scdn.co/image/ab67616d00001e02bf01fd0986a195d485922167';

var sectionStyle = {
  width: '300px',
  height: '300px',
  backgroundImage: `url(${bgUrl})`,
  backgroundColor: 'yellow'
};

export default SongItem;