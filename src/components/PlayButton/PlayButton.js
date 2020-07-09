import React, {Component} from 'react';

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      audioControl,
      songAudio,
      songName
    } = this.props;

    if(songAudio) {
      audioControl(songAudio, songName);
    } else {
      alert('No audio link!');
    }
  }

  render() {
    return(<i className="fa fa-play-circle" aria-hidden="true" onClick={this.handleClick}></i>);
  }
}

export default PlayButton;