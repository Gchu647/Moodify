import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BillboardSongs from '../BillboardSongs/BillboardSongs';
import SearchBar from '../SearchBar/SearchBar';
import SongItem from '../SongItem/SongItem';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import './MainSection.css';

const MainSection = (props) => {
  /******** State Variables ********/
  const [songSuggestions, setSongSuggestions] = useState([{
    name: '',
    artists: '',
    album_image: '',
    song_audio: null,
    moodScore: 0,
    id: '',
    external_url: ''
  }]);
  const [searchResults, setSearchResults] = useState(false); // indicating if there is search results or not
  const [isPlaying, setIsPlaying] = useState(false); // indicate if any song is playing
  const [songIdPlaying, setSongIdPlaying] = useState(''); // track which song id is playing
  const [currAudio, setCurrAudio] = useState(null); // temporary store the current song audio that is clicked to play
  const [showModal, setShowModal] = useState(false);

  /******** UseEffect ********/
  useEffect(() => {
    if (window.innerWidth >= 720) { // only show WelcomeModal, if screen is bigger than 720px
      setShowModal(true);
    }
  }, []);

  useEffect(() => { // this is used as a callback for when I make change to currAudio in audioControl function
    if(isPlaying) {
      currAudio.play();
    }
  }, [currAudio]);

  /******** Functions ********/
  const showSearchResults = (bool) => {
    setSearchResults(bool); // when we types in something to the SearchBar, we show suggestionsListComponent
  }

  const songSearch = (textQuery) => { // send a text query to the Spotify API to look for song
    const text_query = textQuery;

    if (!text_query) // return empty array if search result is empty (this might be breaking my code
      return [];

    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${text_query}&type=track&market=US&limit=12`,
      headers: {
        'Authorization': `Bearer ${props.token}`,
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
      const songsWithMood = props.getMoodScores(props.token, suggestions); // add in moodScores
      
      return songsWithMood;
    })
    .then(songsWithMood => {
      setSongSuggestions(songsWithMood);
    })
    .catch( err => console.log(err));
  }

  const audioControl = (audioLink, songIdClicked) => {
    if (!isPlaying) { // condition 1: when no song is playing
      setCurrAudio(new Audio(audioLink));
      setIsPlaying(true);
      setSongIdPlaying(songIdClicked);
      // currAudio.play() in useEffect
    } else if (currAudio.currentSrc === audioLink && isPlaying) { // condition 2: stop when press the same song
      currAudio.pause(); // pause song
      setIsPlaying(false);
    } else if (currAudio.currentSrc !== audioLink && isPlaying) { // condition 3: switch to a new song
      currAudio.pause();
      setCurrAudio(new Audio(audioLink));
      setSongIdPlaying(songIdClicked);
      // currAudio.play() in useEffect
    }
  }

  const close = () => {
    setShowModal(false); // closes WelcomeModal Component
  }

  /******** Props Variables ********/
  const { 
    songTracks,
    sortOption,
    moodRange
  } = props;

  let suggestionsListComponent;

    if (songSuggestions && songSuggestions.length) { // if songSuggestions is not falsy, and the length is not 0
      suggestionsListComponent = songSuggestions.map(
        song => {
          return (
            <li key={song.id}>
              <SongItem 
                song={song}
                exterURL={song.external_url}
                audioControl={audioControl}
                songIsPlaying={isPlaying}
                songIdPlaying={songIdPlaying}
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
        songSearch={songSearch}
        showSearchResults={showSearchResults}
      />
      <ul className='search-results'>
        {searchResults && suggestionsListComponent}
      </ul>
      {!searchResults && 
      (<BillboardSongs 
        songTracks={songTracks}
        sortOption={sortOption}
        moodRange={moodRange}
        audioControl={audioControl}
        songIsPlaying={isPlaying}
        songIdPlaying={songIdPlaying}
      />)
      }
      <WelcomeModal 
        showModal={showModal}
        close={close}
      />
    </div>
  )
}

export default MainSection;