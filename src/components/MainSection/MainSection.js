import React, {Component} from 'react';
import axios from 'axios';
import BillboardSongs from '../BillboardSongs/BillboardSongs';
import SearchBar from '../SearchBar/SearchBar';
import SongItem from '../SongItem/SongItem';
import WelcomeModal from '../WelcomeModal/WelcomeModal';

import './MainSection.css';

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
        id: null,
        external_url: null
      }],
      searchResults: false,
      isPlaying: false,
      currAudio: null,
      showModal: false
    }

    this.showSearchResults = this.showSearchResults.bind(this);
    this.songSearch = this.songSearch.bind(this);
    this.audioControl = this.audioControl.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth >= 720) { // only show WelcomeModal, if screen is bigger than 720px
      this.setState({ showModal: true });
    }
  }

  showSearchResults(val) {
    this.setState({ searchResults: val}); // when use types in something to the SearchBar, we show suggestionsListComponent
  }

  songSearch(textQuery) { // send a text query to the Spotify API to look for song
    const text_query = textQuery;

    if (!text_query) // return empty array if search result is empty (this might be breaking my code
      return [];

    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${text_query}&type=track&market=US&limit=12`,
      headers: {
        'Authorization': `Bearer ${this.props.token}`,
        'Content-Type': 'SearchApplication/json'
      }
    })
    .then( response => {
      let suggestions = response.data.tracks.items.map(song => { // fetch song name and artists
        // prepare the artist names
        const artists = song.artists.map( elem => {
          return elem.name;
        });

        return {
          name: song.name,
          artists: artists.join(', '),
          album_image: song.album.images[1].url,
          song_audio: song.preview_url,
          id: song.id,
          external_url: song.external_urls.spotify
        }
      })

      return suggestions;
    })
    .then(suggestions => {
      const songsWithMood = this.props.getMoodScores(this.props.token, suggestions); // add in moodScores
      
      return songsWithMood;
    })
    .then(songsWithMood => {
      this.setState({ songSuggestions: songsWithMood });
    })
    .catch( err => console.log(err));
  }

  audioControl(audioLink) {
    if (!this.state.isPlaying) { // condition 1: when no song is playing
      this.setState({
        currAudio: new Audio(audioLink),
        isPlaying: true
      }, () =>{        
        this.state.currAudio.play(); // play song
      });
    } else if (this.state.currAudio.currentSrc === audioLink && this.state.isPlaying) { // condition 2: stop when press the same song
      this.state.currAudio.pause(); // pause song
      this.setState({isPlaying: false});
    } else if (this.state.currAudio.currentSrc !== audioLink && this.state.isPlaying) { // condition 3: switch to a new song
      this.state.currAudio.pause();
      this.setState({currAudio: new Audio(audioLink)}, () => {
        this.state.currAudio.play();
      });
    }
  }

  close() {
    this.setState({showModal: false}); // closes WelcomeModal Component
  }

  render() {
    const { 
      songTracks,
      sortOption,
      moodRange
    } = this.props;

    const { 
      songSuggestions,
      isPlaying
    } = this.state;

    let suggestionsListComponent;

    if (songSuggestions && songSuggestions.length) { // if songSuggestions is not falsy, and the length is not 0
      suggestionsListComponent = songSuggestions.map(
        song => {
          console.log('mainsection, ' + song.external_url);
        return (
          <li key={song.id}>
            <SongItem 
              song={song}
              exterURL={song.external_url}
              audioControl={this.audioControl}
              songIsPlaying={isPlaying}
            />
          </li>
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
        <ul className='search-results'>
          {this.state.searchResults && suggestionsListComponent}
        </ul>
        {!this.state.searchResults && 
        (<BillboardSongs 
          songTracks={songTracks}
          sortOption={sortOption}
          moodRange={moodRange}
          audioControl={this.audioControl}
        />)
        }
        <WelcomeModal 
          showModal={this.state.showModal}
          close={this.close}
        />
      </div>
    )
  }
}

export default MainSection;