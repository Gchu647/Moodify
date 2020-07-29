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

    if (filteredSongs.length < 1) { // stop the function when there are no filtered songs
      return (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      )
    }

    let ascendSongs = ( // sort songs from low moodScore to high
      filteredSongs
      .sort((songA, songB) => {
        return songA.moodScore - songB.moodScore
      })
      .map( song => {
        return (
          <li key={song.id}>
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
          </li>
        )
      })
    );

    if(sortOption === 'happy') { // reverse the order to descend if 'happy'
      return (
        <ul className='BillboardSongs'>
          {ascendSongs.reverse()}
        </ul>
      )
    } else if (sortOption === 'sad') { // just return ascendSongs if 'sad'
      return (
        <ul className='BillboardSongs'>
          {ascendSongs}
        </ul>
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