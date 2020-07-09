import React, {Component} from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
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
    return(
      <div>
        <i className="fa fa-play-circle" aria-hidden="true" onClick={this.handleClick}></i>
        <Modal size='xs' show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <div>Spotify does not support previewing this song. Click here to listen to the full track</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PlayButton;