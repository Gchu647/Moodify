import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
  /******** State Variables ********/
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [storeDelay, setStoreDelay] = useState(null);

  /******** Props Variables ********/
  const {
    songSearch,
    showSearchResults 
  } = props;

  /******** Functions ********/
  const onChange = (e) => { // Event fired when the input value is changed
    const input = e.currentTarget.value;

    // this stops delaySearch if you keep typing in input in a given time frame
    clearTimeout(storeDelay);
    
    if (input) { // do a user search if input is not empty
      setUserInput(input);

      setStoreDelay(setTimeout(function() {
        delaySearch(input); // do a delaySearch after 0.5 second
      }, 500));
    } else {
      setUserInput('');
      setShowSuggestions(false);
      showSearchResults(false);
    }
  }

  const delaySearch = (txt) => { // search for songs using the userInput
    songSearch(txt) // give it userInput
    .then(() => { // gives back songSuggestions based on your search
      setShowSuggestions(true);
      showSearchResults(true);
    })
    .catch( err => console.log(err));
  }

  return (
    <div className='search-bar'>
      <i className="material-icons search">search</i>
      <input
        type="text"
        onChange={onChange}
        placeholder='Search songs or artists...'
        value={userInput}
      />
    </div>
  );
}

export default SearchBar;