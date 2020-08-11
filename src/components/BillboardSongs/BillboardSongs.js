import React from 'react';
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

const BillboardSongs = (props) => {
  /******** Props Variables ********/
  const {
    songTracks,
    moodRange,
    audioControl,
    songIsPlaying,
    songIdPlaying,
    sortOption
  } = props;

  /******** Functions ********/
  const songTrackRange = (moodRange) => {
    const filteredSongs = (
      songTracks
      .filter(song => {
        return (song.moodScore >= moodRange[0] && song.moodScore <= moodRange[1])
      })
    );

    return filteredSongs;
  }

  const sortSongItems = (sortOption) => { // sort the SongItems by Happy or Sad
    const filteredSongs = songTrackRange(moodRange);

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
              song={song} 
              exterURL={null} // All BillBoardSongs have song previews, so no need exterURL
              audioControl={audioControl}
              songIsPlaying={songIsPlaying}
              songIdPlaying={songIdPlaying}
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

  return (
    <div>
      {sortSongItems(sortOption)}
    </div>
  )
}

export default BillboardSongs;