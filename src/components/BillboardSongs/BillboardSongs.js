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
    this.setState({currAudio: new Audio(audioLink)}, () =>{
      console.log(songName + ': ' + this.state.currAudio);
      console.log(songName + ': ' + this.state.isPlaying);
  
      if(!this.state.isPlaying && this.state.currAudio) { // if song is not playing and audioLink is not falsy
        console.log('playing');
        this.state.currAudio.play(); // play song
        this.setState({isPlaying: true});
      } else {
        console.log('pause');
        this.state.currAudio.pause(); // pause song
        this.setState({isPlaying: false});
      }
    });
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