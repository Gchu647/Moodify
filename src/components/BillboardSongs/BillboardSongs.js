import React from "react";
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

const BillboardSongs = ({songTracks})=> {

  return (
    <div className='BillboardSongs'>
      {console.log('BillboardSongs: ', songTracks)}
      {songTracks.map( song => {
        return (
          <p>{'"'+song.name + '" by ' + song.artists}</p>
        )
      })}
    </div>
  )
}

export default BillboardSongs;