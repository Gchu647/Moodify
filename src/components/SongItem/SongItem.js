import React, {Component} from 'react';
import './SongItem.css';
import PlayButton from '../PlayButton/PlayButton';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currAudio: null,
      isPlaying: false,
    }

    this.audioControl = this.audioControl.bind(this);
  }

  audioControl(audioLink) {
    if (!this.state.isPlaying) { // condition 1: when no song is playing
      console.log('no song isPlaying: ', this.state.isPlaying);
      this.setState({
        currAudio: new Audio(audioLink),
        isPlaying: true
      }, () =>{        
        this.state.currAudio.play(); // play song
      });
    } else if (this.state.currAudio.currentSrc === audioLink && this.state.isPlaying) { // condition 2: stop when press the same song
      console.log('stop same song: ', this.state.isPlaying);
      this.state.currAudio.pause(); // pause song
      this.setState({isPlaying: false});
    } else if (this.state.currAudio.currentSrc != audioLink && this.state.isPlaying) { // condition 3: switch to a new song
      console.log('switch new song: ', this.state.isPlaying);
      this.state.currAudio.pause();
      this.setState({currAudio: new Audio(audioLink)}, () => {
        this.state.currAudio.play();
      });
    }
  }

  render() {
    const {
      songName,
      songAudio,
      artists, 
      albumImage,
      moodScore,
      exterURL
    } = this.props;
    
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
              audioControl={this.audioControl} 
              songAudio={songAudio}
              songIsPlaying={this.state.isPlaying}
              songName={songName}
              exterURL={exterURL}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SongItem;