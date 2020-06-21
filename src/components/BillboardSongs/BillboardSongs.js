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
    console.log(songName + ': ' + audioLink);
    console.log(songName + ': ' + this.state.isPlaying);

    const currAudio = new Audio(audioLink);

    if(!this.state.isPlaying && audioLink) { // if song is not playing and audioLink is not falsy
      console.log('playing')
      currAudio.play(); // play song
      this.setState({isPlaying: true});
    } else {
      currAudio.pause(); // pause song
      this.setState({isPlaying: false});
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