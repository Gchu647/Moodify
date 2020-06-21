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
    if(!this.state.currAudio && !this.state.isPlaying) {
      this.setState({
        currAudio: new Audio(audioLink),
        isPlaying: true
      }, () =>{
        console.log(songName + ': ' + this.state.currAudio.currentSrc);
        console.log(songName + ': ' + this.state.isPlaying);
        console.log('condtion 1: playing');
        
        this.state.currAudio.play(); // play song
      });
    } else {
      console.log(songName + ': ' + typeof this.state.currAudio.currentSrc);
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