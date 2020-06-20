import React, {Component} from 'react';
import qs from 'qs';
import axios from 'axios';
import { headers, data } from '../../config';
import logo from '../../logo.svg';
import './App.css';
import BillboardSongs from '../BillboardSongs/BillboardSongs';

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      items: [{
        name: null,
        artists: null,
        album_image: null,
        song_audio: null,
      }],
      songPlaying: false,
    }

    this.getToken = this.getToken.bind(this);
    this.getBillboardSongId = this.getBillboardSongId.bind(this);
    this.getAllSongTracks = this.getAllSongTracks.bind(this);
    // this.getSongTrack = this.getSongTrack.bind(this);
    this.audioControl = this.audioControl.bind(this);
    this.showState = this.showState.bind(this);
  }

  async componentDidMount() {
    // Fetch token using client credentials flow  authorization
    const _token = await this.getToken();
    // Requst for Billboard Playst and use for loop to get Get track.name and track.id and put it in an object.
    const songIdList = await this.getBillboardSongId(_token);
    const songTracks = await this.getAllSongTracks(_token, songIdList);
    console.log('song tracks: ', songTracks);

    this.setState({ items: songTracks});
    // await this.getSongTrack(_token);// get track
  }

  showState() {
    console.log(this.state.items);
  }

  getToken () {
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

  getBillboardSongId(token) {
    console.log('get BillBoard Music!');
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
      for (let i = 0; i < 20; i++) { // change song limit over here
        songId.push(response.data.items[i].track.id)
      }

      return songId;
    })
    .catch( err => console.log(err));
  }
  
  getAllSongTracks(token, songIdList) {
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
        // console.log('track name 2: ' + response.data.name);
        // console.log('track preview_url2' + response.data.preview_url);
         
        // prepare the artist names
        let artists = response.data.album.artists.map( elem => {
          return elem.name
        });
         
        if (response.data.preview_url) { // only return songs that have a audio preview
          let songItem = {
            name: response.data.name,
            artists: artists.join(', '),
            album_image: response.data.album.images[1].url,
            song_audio: response.data.preview_url, //Notes: turn into ino new Audio later
           }
  
          //  console.log('songItem', songItem);
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

  audioControl() {
    console.log('audioControl', this.state.items.song_audio);

    if(!this.state.songPlaying && this.state.items.song_audio) { // if song is not playing and song_audio is not falsy
      this.state.items.song_audio.play(); // play song
      this.setState({songPlaying: true});
    } else {
      this.state.items.song_audio.pause(); // pause song
      this.setState({songPlaying: false});
    }
    
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.showState}>Show State</button>
        <br/>
        <BillboardSongs 
          songTracks={this.state.items}
          audioControl={this.audioControl}
        />
      </div>
    );
  }
}

export default App;
