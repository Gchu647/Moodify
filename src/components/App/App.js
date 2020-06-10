import React, {Component} from 'react';
import qs from 'qs';
import axios from 'axios';
import { headers, data } from '../../config';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    // Fetch token using client credentials flow  authorization
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    )
    .then( response => {
      console.log('result', response.data);
    })
    .catch( err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
