import React, {Component} from 'react';

class PlayButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<i class="fa fa-play-circle" aria-hidden="true" onClick={this.props.audioControl}></i>);
  }
}

export default PlayButton;