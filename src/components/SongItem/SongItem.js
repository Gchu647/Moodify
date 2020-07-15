import React, {Component} from 'react';
import './SongItem.css';
import PlayButton from '../PlayButton/PlayButton';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songAudio: null,
      isPlaying: false,
    }

    this.audioControl = this.audioControl.bind(this);
  }

  audioControl() {
    if (!this.state.isPlaying) { // condition 1: when no song is playing
      console.log('no song isPlaying: ', this.state.isPlaying);
      this.setState({
        songAudio: new Audio(this.props.audioLink),
        isPlaying: true
      }, () =>{        
        this.state.songAudio.play(); // play song
      });
    } else if (this.state.songAudio.currentSrc === this.props.audioLink && this.state.isPlaying) { // condition 2: stop when press the same song
      console.log('stop same song: ', this.state.isPlaying);
      this.state.songAudio.pause(); // pause song
      this.setState({isPlaying: false});
    } else if (this.state.songAudio.currentSrc != this.props.audioLink && this.state.isPlaying) { // condition 3: switch to a new song
      console.log('switch new song: ', this.state.isPlaying);
      this.state.songAudio.pause();
      this.setState({songAudio: new Audio(this.props.audioLink)}, () => {
        this.state.songAudio.play();
      });
    }
  }

  render() {
    const {
      songName,
      audioLink,
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
              audioLink={audioLink}
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