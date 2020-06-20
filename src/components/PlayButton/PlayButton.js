import React, {Component} from 'react';

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.audioControl(this.props.songAudio);
  }


  render() {
    return(<i class="fa fa-play-circle" aria-hidden="true" onClick={this.handleClick}></i>);
  }
}

export default PlayButton;