import React, {Component} from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import './PlayButton.css';

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
      audioLink,
    } = this.props;

    if(audioLink) {
      audioControl(audioLink); // call on the audioControl in MainSection
    } else {
      this.open();
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
        <div className="audio-button ">
          <i className="material-icons" onClick={this.handleClick}>play_arrow</i>
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