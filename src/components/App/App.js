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
        song_preview: null,
      }
    }

    this.getToken = this.getToken.bind(this);
    this.getSongPreview = this.getSongPreview.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  async componentDidMount() {
    // Fetch token using client credentials flow  authorization
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
          song_preview: response.data.preview_url,
        }
      });
    })
    .catch( err => console.log(err));
  }

  playAudio() {
    console.log('playAudio', this.state.items.song_preview);
    let audio = new Audio(this.state.items.song_preview);
    audio.play();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.playAudio}>
            Play Audio
          </button>
        </header>
      </div>
    );
  }
}

export default App;
