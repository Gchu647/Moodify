import React, {Component} from 'react';
import axios from 'axios';
import BillboardSongs from '../BillboardSongs/BillboardSongs';
import SearchBar from '../SearchBar/SearchBar';
import SongItem from '../SongItem/SongItem';

import './MainSection.css';

class MainSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songSuggestions: [{
        name: '',
        artists: '',
        album_image: null,
        audio: null,
        moodScore: null,
        id: null,
        external_url: null
      }],
      searchResults: false,
    }

    this.showSearchResults = this.showSearchResults.bind(this);
    this.songSearch = this.songSearch.bind(this);
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
      url: `https://api.spotify.com/v1/search?q=${text_query}&type=track&market=US&limit=8`,
      headers: {
        'Authorization': `Bearer ${this.props.token}`,
        'Content-Type': 'SearchApplication/json'
      }
    })
    .then( response => {
      // console.log('search songs 1! ', response.data.tracks.items);

      let suggestions = response.data.tracks.items.map(song => { // fetch song name and artists
        // prepare the artist names
        const artists = song.artists.map( elem => {
          return elem.name;
        });

        console.log('external url! ', song.external_urls.spotify);

        return {
          name: song.name,
          artists: artists.join(', '),
          album_image: song.album.images[1].url,
          audio: song.preview_url,
          id: song.id,
          external_url: song.external_urls.spotify
        }
      })

      console.log('search songs 2!', suggestions);
      return suggestions;
    })
    .then(suggestions => {
      const songsWithMood = this.props.getMoodScores(this.props.token, suggestions); // add in moodScores
      
      return songsWithMood;
    })
    .then(songsWithMood => {
      // console.log('length hello: ', songsWithMood);
      // console.log('length hello: ', songsWithMood.length);

      this.setState({ songSuggestions: songsWithMood });
    })
    .catch( err => console.log(err));
  }

  render() {
    const { 
      songTracks,
      sortOption,
      moodRange
    } = this.props;

    const { songSuggestions } = this.state;

    // console.log('songSuggestions: ', songSuggestions);
    // console.log('suggestionLength: ', songSuggestions.length);

    let suggestionsListComponent;

    if (songSuggestions && songSuggestions.length) { // if songSuggestions is not falsy, and the length is not 0
      suggestionsListComponent = songSuggestions.map(
        song => {
        return (
          <SongItem 
            songName={song.name}
            songAudio={song.audio}
            artists={song.artists}
            albumImage={song.album_image}
            moodScore={song.moodScore}
            exterURL={song.external_url}
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
      </div>
    )
  }
}

export default MainSection;