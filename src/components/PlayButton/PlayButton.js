import React, {Component} from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import './PlayButton.css';

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      isPlaying: false
    }

    this.audioButton = this.audioButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  audioButton () {
    if(!this.state.isPlaying) {
      return (<i className="material-icons" onClick={this.handleClick}>play_arrow</i>);
    } else {
      return (<i className="material-icons" onClick={this.handleClick}>stop</i>);
    }
  }

  handleClick() {
    const {
      audioControl,
      songAudio,
      songName,
    } = this.props;

    if(songAudio) {
      audioControl(songAudio, songName); // call on the audioControl in MainSection

      if(!this.state.isPlaying) { // change the setting of our audioButton
        this.setState({ isPlaying: true });
      } else {
        this.setState({ isPlaying: false });
      }
    } else {
      this.open('xs');
    }
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    // console.log('Is song playing ', this.props.songIsPlaying);

    return(
      <div>
        <div className="audio-button ">
          {this.audioButton()}
        </div>
        <Modal size='xs' show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <p>Spotify does not support previewing this song.</p>
            <p>{this.props.exterURL && (<a href={this.props.exterURL} target="_blank">Click here </a>)} 
             to listen to the song on Spotify</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PlayButton;