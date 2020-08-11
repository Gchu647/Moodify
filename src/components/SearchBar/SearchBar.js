import React, { Component } from "react";
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    .then(() => { // gives back songSuggestions based on your search
      this.setState({showSuggestions: true});

      this.props.showSearchResults(true);
    })
    .catch( err => console.log(err));
  }

  render() {
    const {
      onChange,
      state: {
        userInput
      }
    } = this;

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
}

export default SearchBar;