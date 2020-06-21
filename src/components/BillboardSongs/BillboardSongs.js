import React, {Component} from 'react';
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

class BillboardSongs extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currAudio: null,
      isPlaying: false,
    };

    this.audioControl = this.audioControl.bind(this);
  }

  audioControl(audioLink, songName) {
    if (!this.state.currAudio && !this.state.isPlaying) {
      this.setState({
        currAudio: new Audio(audioLink),
        isPlaying: true
      }, () =>{
        console.log(songName + 'is playing ' + this.state.isPlaying);
        
        this.state.currAudio.play(); // play song
      });
    } else if (this.state.currAudio.currentSrc === audioLink && this.state.isPlaying) {
      // console.log(songName + ': ' + typeof this.state.currAudio.currentSrc);
      console.log(songName + 'is paused' + this.state.isPlaying);

      this.state.currAudio.pause(); // pause song
      this.setState({isPlaying: false});
    } else if (this.state.currAudio.currentSrc != audioLink && this.state.isPlaying) {
      console.log(songName + 'is a new song' + this.state.isPlaying);

      this.state.currAudio.pause();
      this.setState({currAudio: new Audio(audioLink)}, () => {
        this.state.currAudio.play();
      });
    }
  }

  render() {
    return (
      <div className='BillboardSongs'>
        {this.props.songTracks.map( song => {
          return (
            // <p>{'"'+song.name + '" by ' + song.artists}</p>
            <SongItem 
              songName={song.name}
              songAudio={song.song_audio}
              artists={song.artists}
              albumImage={song.album_image}
              audioControl={this.audioControl}
            />
          )
        })}
      </div>
    )
  }
}

export default BillboardSongs;