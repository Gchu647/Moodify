import React, {Component} from 'react';
import qs from 'qs';
import axios from 'axios';
import { headers, data } from '../../config';
import logo from '../../logo.svg';
import './App.css';
import SongItem from '../SongItem/SongItem';

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      items: {
        name: null,
        artists: null,
        album_image: null,
        song_audio: null,
      },
      songPlaying: false,
    }

    this.getToken = this.getToken.bind(this);
    this.getSongTrack = this.getSongTrack.bind(this);
    this.audioControl = this.audioControl.bind(this);
  }

  async componentDidMount() {
    // Fetch token using client credentials flow  authorization
    const _token = await this.getToken();
    console.log('result', _token);
    
    await this.getSongTrack(_token);// get track
    console.log('componentDidMount: ', this.state.items);
  }

  getToken (token) {
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

  getSongTrack(token) {
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/tracks/7eJMfftS33KTjuF7lTsMCx?market=US`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then( response => {
      // console.log('track name: ' + response.data.name);
      // console.log('track preview_url' + response.data.preview_url);
       
      // prepare the artist names
       let artists = response.data.album.artists.map( elem => {
         return elem.name
       });

      this.setState({ 
        items: {
          name: response.data.name,
          artists: artists.join(', '),
          album_image: response.data.album.images[1].url,
          song_audio: new Audio(response.data.preview_url),
        }
      });
    })
    .catch( err => console.log(err));
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
        <SongItem 
          songName={this.state.items.name}
          artists={this.state.items.artists}
          albumImage={this.state.items.album_image}
          audioControl={this.audioControl}
        />
      </div>
    );
  }
}

export default App;
