import React from "react";
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

const BillboardSongs = props => {

  return (
    <div className='BillboardSongs'>
      {console.log('BillboardSongs: ', props.songTracks)}
      {props.songTracks.map( item => {
        return (
          <p>{'"'+item.name + '" by ' + item.artists}</p>
        )
      })}
    </div>
  )
}

export default BillboardSongs;