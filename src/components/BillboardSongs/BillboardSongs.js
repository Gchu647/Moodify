import React, {Component} from 'react';
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

class BillboardSongs extends Component {
  constructor(props) {
    super(props);

    this.songTrackRange = this.songTrackRange.bind(this);
    this.sortSongItems = this.sortSongItems.bind(this);
  }

  songTrackRange(moodRange) { // filters out the song tracks based on moodScore    
    const filteredSongs = (
      this.props.songTracks
      .filter(song => {
        return (song.moodScore >= moodRange[0] && song.moodScore <= moodRange[1])
      })
    );

    return filteredSongs;
  }

  sortSongItems(sortOption) { // sort the SongItems by Happy or Sad
    const filteredSongs = this.songTrackRange(this.props.moodRange);

    let ascendSongs = ( // sort songs from low moodScore to high
      filteredSongs
      .sort((songA, songB) => {
        return songA.moodScore - songB.moodScore
      })
      .map( song => {
        return (
          <SongItem 
            songName={song.name}
            audioLink={song.song_audio}
            artists={song.artists}
            albumImage={song.album_image}
            moodScore={song.moodScore}
            exterURL={null} // All BillBoardSongs have song previews, so no need exterURL
            audioControl={this.props.audioControl}
            songIsPlaying={this.props.songIsPlaying}
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
      <div>
        {this.sortSongItems(this.props.sortOption)}
      </div>
    )
  }
}

export default BillboardSongs;