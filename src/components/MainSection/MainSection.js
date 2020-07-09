import React, {Component} from 'react';
import axios from 'axios';
import BillboardSongs from '../BillboardSongs/BillboardSongs';
import SearchBar from '../SearchBar/SearchBar';
import SongItem from '../SongItem/SongItem';
import { Modal, Button } from 'rsuite';

import './MainSection.css';
import 'rsuite/dist/styles/rsuite-default.css';

class MainSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songSuggestions: [{
        name: '',
        artists: '',
        album_image: null,
        song_audio: null,
        moodScore: null,
        id: null
      }],
      searchResults: false,
      showModal: false,
    }

    this.songSearch = this.songSearch.bind(this);
    this.showSearchResults = this.showSearchResults.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  showSearchResults(val) {
    this.setState({ searchResults: val});
  }

  songSearch(textQuery) {
    const text_query = textQuery;

    if (!text_query) // return empty array if search result is empty (this might be breaking my code)
      return [];

    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${text_query}&type=track&market=US&limit=10`,
      headers: {
        'Authorization': `Bearer ${this.props.token}`,
        'Content-Type': 'SearchApplication/json'
      }
    })
    .then( response => {
      // console.log('search songs! ', response.data.tracks.items);

      let suggestions = response.data.tracks.items.map(song => { // fetch song name and artists
        // prepare the artist names
        const artists = song.artists.map( elem => {
          return elem.name;
        });

        return {
          name: song.name,
          artists: artists.join(', '),
          album_image: song.album.images[1].url,
          id: song.id
        }
      })

      // console.log('search songs!', suggestions);
      return suggestions;
    })
    .then(suggestions => {
      const songsWithMood = this.props.getMoodScores(this.props.token, suggestions);
      
      return songsWithMood;
    })
    .then(songsWithMood => {
      // console.log('length hello: ', songsWithMood);
      // console.log('length hello: ', songsWithMood.length);

      this.setState({ songSuggestions: songsWithMood });
    })
    .catch( err => console.log(err));
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { 
      songTracks,
      sortOption,
      moodRange
    } = this.props;

    const { songSuggestions } = this.state;

    console.log('songSuggestions: ', songSuggestions);
    console.log('suggestionLength: ', songSuggestions.length);

    let suggestionsListComponent;

    if (songSuggestions && songSuggestions.length) { // if songSuggestions is not falsy, and the length is not 0
      console.log('pass through if statement.')
      suggestionsListComponent = songSuggestions.map(
        song => {
        // console.log('Billboard ' + song.name);
        return (
          <SongItem 
            songName={song.name}
            songAudio={null}
            artists={song.artists}
            albumImage={song.album_image}
            moodScore={song.moodScore}
            audioControl={null}
          />
        )
      });
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }

    return (
      <div>
        <SearchBar 
          songSearch={this.songSearch}
          showSearchResults={this.showSearchResults}
        />
        <Button size="xs" onClick={() => this.open('xs')}>
            Modal
        </Button>
        <div className='search-results'>
          {this.state.searchResults && suggestionsListComponent}
        </div>
        {!this.state.searchResults && 
        (<BillboardSongs 
          songTracks={songTracks}
          sortOption={sortOption}
          moodRange={moodRange}
        />)
        }
        <Modal size='xs' show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>This is Modal</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default MainSection;