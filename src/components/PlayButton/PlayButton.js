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

    audioControl(songAudio, songName);
  }

  render() {
    return(<i className="fa fa-play-circle" aria-hidden="true" onClick={this.handleClick}></i>);
  }
}

export default PlayButton;