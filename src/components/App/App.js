import React, {Component} from 'react';
import qs from 'qs';
import axios from 'axios';
import { headers, data } from '../../config';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      items: {
        name: null,
        album_image: null,
        song_audio: null,
      },
      songPlaying: false,
    }

    this.getToken = this.getToken.bind(this);
    this.getSongPreview = this.getSongPreview.bind(this);
    this.audioControl = this.audioControl.bind(this);
  }

  async componentDidMount() {
    // Fetch token using client credentials flow  authorization
    console.log('componentDidMount: ', this.state.items.song_audio);
    const _token = await this.getToken();
    console.log('result', _token);
    
    await this.getSongPreview(_token);// get track
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

  getSongPreview(token) {
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/tracks/6WrI0LAC5M1Rw2MnX2ZvEg?market=US`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then( response => {
      // console.log('track name: ' + response.data.name);
      // console.log('track preview_url' + response.data.preview_url);

      this.setState({ 
        items: {
          name: response.data.name,
          album_image: null,
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.audioControl}>
            Play / Pause
          </button>
        </header>
      </div>
    );
  }
}

export default App;
