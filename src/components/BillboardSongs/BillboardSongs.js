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
    this.sortedSongItems = this.sortedSongItems.bind(this);
  }

  audioControl(audioLink, songName) {
    if (!this.state.isPlaying) { // condition 1: when no song is playing
      this.setState({
        currAudio: new Audio(audioLink),
        isPlaying: true
      }, () =>{
        console.log(songName + 'is playing ' + this.state.isPlaying);
        
        this.state.currAudio.play(); // play song
      });
    } else if (this.state.currAudio.currentSrc === audioLink && this.state.isPlaying) { // condition 2: stop when press the same song
      // console.log(songName + ': ' + typeof this.state.currAudio.currentSrc);
      console.log(songName + 'is paused' + this.state.isPlaying);

      this.state.currAudio.pause(); // pause song
      this.setState({isPlaying: false});
    } else if (this.state.currAudio.currentSrc != audioLink && this.state.isPlaying) { // condition 3: switch to a new song
      console.log(songName + 'is a new song' + this.state.isPlaying);

      this.state.currAudio.pause();
      this.setState({currAudio: new Audio(audioLink)}, () => {
        this.state.currAudio.play();
      });
    }
  }

  sortedSongItems(sortOption) {
    let ascendSongs = ( // sort songs from low moodScore to high
      this.props.songTracks
      .sort((songA, songB) => {
        return songA.moodScore - songB.moodScore
      })
      .map( song => {
        console.log('Billboard ' + song.name);
        return (
          <SongItem 
            songName={song.name}
            songAudio={song.song_audio}
            artists={song.artists}
            albumImage={song.album_image}
            moodScore={song.moodScore}
            audioControl={this.audioControl}
          />
        )
      })
    );

    if(sortOption === 'happy') { // reverse the order to descend if 'happy'
      return (
        <div className='BillboardSongs'>
          {ascendSongs.reverse()}
        </div>
      )
    } else if (sortOption === 'sad') { // just return ascendSongs if 'sad'
      return (
        <div className='BillboardSongs'>
          {ascendSongs}
        </div>
      )
    }
  }

  render() {
    return (
      this.sortedSongItems('sad')
    )
  }
}

export default BillboardSongs;