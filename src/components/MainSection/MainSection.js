import React, {Component} from 'react';
import axios from 'axios';
import BillboardSongs from '../BillboardSongs/BillboardSongs';
import SearchBar from '../SearchBar/SearchBar'

class MainSection extends Component {
  constructor(props) {
    super(props);

    this.songSearch = this.songSearch.bind(this);
  }

  songSearch(textQuery) {
    const text_query = textQuery;

    if (!text_query) // return empty array if search result is empty (this might be breaking my code)
      return [];

    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${text_query}&type=track&market=US&limit=5`,
      headers: {
        'Authorization': `Bearer ${this.props.token}`,
        'Content-Type': 'SearchApplication/json'
      }
    })
    .then( response => {
      // console.log('search songs! ', response.data.tracks.items);

      let songSuggestions = response.data.tracks.items.map(song => { // fetch song name and artists
        // prepare the artist names
        const artists = song.artists.map( elem => {
          return elem.name;
        });

        return {
          songName: song.name,
          artists: artists.join(', ')
        }

        // return song.name;
      })

      // console.log('search songs!', songSuggestions);
      return songSuggestions;
    })
    .catch( err => console.log(err));
  }

  render() {
    const { 
      songTracks,
      sortOption,
      moodRange
    } = this.props;

    return (
      <div>
        <SearchBar 
          songSearch={this.songSearch}
        />
        <BillboardSongs 
          songTracks={songTracks}
          sortOption={sortOption}
          moodRange={moodRange}
        />
      </div>
    )
  }
}

export default MainSection;