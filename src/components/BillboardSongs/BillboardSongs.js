import React, {Component} from 'react';
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

class BillboardSongs extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      audioPlaying: null,
    };

    this.audioControl = this.audioControl.bind(this);
  }

  audioControl(audio) {
    console.log('new audio control!', audio);
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