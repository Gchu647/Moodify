import React, { useState, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import { headers, data } from '../../config';
import './App.css';
import VerticalSlider from '../VerticalSlider/VerticalSlider';
import MoodButtonGroup from '../MoodButtonGroup/MoodButtonGroup';
import MainSection from '../MainSection/MainSection';

const App = () => {
  /******** State Variables ********/
  const [token, setToken] = useState('');
  const [items, setItems] = useState([{
    name: '',
    artists: '',
    album_image: '',
    song_audio: null,
    moodScore: '',
    id: ''
  }]);
  const [sortOption, setSortOption] = useState('happy');
  const [moodRange, setMoodRange] = useState([0, 100]);

  /******** UseEffect ********/
  useEffect(()=> {
    async function useSpotifyAPI() {
      // Fetch token using client credentials flow  authorization
      const _token = await fetchToken();
      // Fetch the top 45 song track ids from the Billboard Hot 100 Chart
      const songIdList = await getBillboardSongsId(_token);
      // Use the song track ids to get the information for this.state.items
      const songTracks = await getAllSongTracks(_token, songIdList);
      // Make another to get the valence score from Spotify API
      const songsWithMood = await getMoodScores(_token, songTracks);

      setToken(_token);
      setItems(songsWithMood);
    }

    useSpotifyAPI();
  }, [])

  /******** Functions ********/
  const fetchToken = () => {
    return axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    )
    .then( response => {
      return response.data.access_token;

    })
    .catch( err => console.log(err));
  }

  const getBillboardSongsId = (token) => {
    const playlist_id = '6UeSakyzhiEt4NB3UAd6NQ'; // BillBoard Playlist ID
    const songId = [];

    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then( response => {
      for (let i = 0; i < 45; i++) { // change song limit over here, or set it to response.data.items.length
        songId.push(response.data.items[i].track.id)
      }

      return songId;
    })
    .catch( err => console.log(err));
  }
  
  const getAllSongTracks = (token, songIdList) => {
    let songTracks = songIdList.map(songId => {
      return axios({
        method: 'get',
        url: `https://api.spotify.com/v1/tracks/${songId}?market=US`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then( response => {         
        // prepare the artist names
        let artists = response.data.album.artists.map( elem => {
          return elem.name
        });

        if(response.data.preview_url) { // only store songs with a audio preview
          let songItem = {
            name: response.data.name,
            artists: artists.join(', '),
            album_image: response.data.album.images[1].url,
            song_audio: response.data.preview_url,
            id: songId
          }

          return songItem;
        }

        return null;
      })
      .catch( err => console.log(err));
    })

    // Wait for all axios requests to process first, then filter out all the songs with no audio, and return the rest.
    return axios.all(songTracks)
    .then(response => {
      return response.filter(song => {
        return song;
      })
    })
  }

  const getMoodScores = (token, songs) => {
    let requestFeatures = songs.map(songTrack => {
      return axios({
        method: 'get',
        url: `https://api.spotify.com/v1/audio-features/${songTrack.id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then( features => {
        let moodScore = Math.round(features.data.valence * 100);
        songTrack.moodScore = moodScore; // adding features to the songs objects
      })
      .catch( err => console.log(err));
    })

    // Wait for all axios requests to process first, and then return songs with features.
    return axios.all(requestFeatures)
    .then(() => {
      return songs;
    })
  }

  const happySort = () => { // label sortOption for sorting in the BillboardSongs Component 
    setSortOption('happy');
  }

  const sadSort = () => { // label sortOption for sorting in the BillboardSongs Component 
    setSortOption('sad');
  }

  const callSetMoodRange = (range) => { 
    setMoodRange(range);
  }

  return (
    <div className='App'>
      <div className='mobile-screen'>
        <h3>Please view this application on a Desktop or Laptop</h3>
      </div>
      <div className='Moodify'>
        <div className='left-side-section'>
          <MoodButtonGroup 
            appearance='subtle' 
            color='blue'
            happySort={happySort}
            sadSort={sadSort}
          />
          <VerticalSlider
            setMoodRange={callSetMoodRange}
          />
        </div>
        <div className='main-section'>
          <MainSection
            songTracks={items}
            sortOption={sortOption}
            moodRange={moodRange}
            token={token}
            getMoodScores={getMoodScores}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
