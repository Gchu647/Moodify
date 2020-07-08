import React, { Component, Fragment } from "react";
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input in Spotify API
      songSuggestions: [{
        name: '',
        artists: '',
        album_image: null,
        song_audio: null,
        moodScore: null,
        id: null
      }],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
      // store the delaySearch function
      storeDelay: null,
    };

    this.delaySearch = this.delaySearch.bind(this);
  }

  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.currentTarget.value;
    const self = this; // the this in storeDelay is not binded

    // this stops delaySearch if you keep typing in input in a given time frame
    clearTimeout(self.state.storeDelay);

    if (userInput) { // do a user search if userInput is not empty
      self.setState({
        userInput: userInput,
        storeDelay: setTimeout(function() {
          self.delaySearch(userInput); // do a delaySearch after 0.5 second
        }, 500)
      });
    } else {
      this.setState({ 
        userInput: '',
        showSuggestions: false 
      });

      this.props.showSearchResults(false);
    }
  }

  delaySearch(txt) { // search for songs using the userInput
    const { songSearch } = this.props;

    songSearch(txt) // give it userInput
    .then(songSuggestions => { // gives back songSuggestions based on your search
      // console.log('onChange: ', songSuggestions);

      this.setState({
        activeSuggestion: 0,
        songSuggestions: songSuggestions,
        showSuggestions: true
      });

      this.props.showSearchResults(true);
    })
    .catch( err => console.log(err));
  }

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    const newInput = e.currentTarget.getElementsByTagName('p')[0].innerText;

    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: newInput
    });
  };

  render() {
    const {
      onChange,
      onClick,
      state: {
        activeSuggestion,
        songSuggestions, // when is the value triggered?
        showSuggestions,
        userInput
      }
    } = this;

    console.log('songSuggestions: ', songSuggestions);

    let suggestionsListComponent;

    if (showSuggestions && userInput) { // when these state values are not falsy
      if (songSuggestions.length) { // length of 0 is falsy value, so when not 0
        suggestionsListComponent = (
          // Unordered list of suggestions
          <ul className="suggestions">
            {songSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active"; // only active suggestions and hover get to have a cool color
              }

              return (
                <li
                  className={className}
                  key={index}
                  onClick={onClick}
                >
                  <p>{suggestion.name}</p>
                  <p className='artists'>{suggestion.artists}</p>
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          placeholder='Search songs and people...'
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default SearchBar;