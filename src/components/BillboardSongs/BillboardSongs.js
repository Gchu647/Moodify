import React from "react";
import "./BillboardSongs.css";
import SongItem from '../SongItem/SongItem';

const BillboardSongs = ({songTracks, audioControl})=> {

  return (
    <div className='BillboardSongs'>
      {console.log('BillboardSongs: ', songTracks)}
      {songTracks.map( song => {
        return (
          // <p>{'"'+song.name + '" by ' + song.artists}</p>
          <SongItem 
            songName={song.name}
            artists={song.artists}
            albumImage={song.album_image}
            audioControl={audioControl}
          />
        )
      })}
    </div>
  )
}

export default BillboardSongs;