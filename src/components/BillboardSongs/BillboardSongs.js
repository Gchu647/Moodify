import React, {Component} from 'react';
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

class BillboardSongs extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      audioPlaying: null,
      songPlaying: false,
    };

    this.audioControl = this.audioControl.bind(this);
  }

  audioControl(audioLink) {
    console.log('new audio control!', audioLink);
    const currAudio = new Audio(audioLink);

    if(!this.state.songPlaying && audioLink) { // if song is not playing and audioLink is not falsy
      currAudio.play(); // play song
      this.setState({songPlaying: true});
    } else {
      currAudio.pause(); // pause song
      this.setState({songPlaying: false});
    }
  }

  render() {
    return (
      <div className='BillboardSongs'>
        {console.log('BillboardSongs: ', this.props.songTracks)}
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