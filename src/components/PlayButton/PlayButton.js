import React, {Component} from 'react';
import './PlayButton.css';
import NoPreviewModal from '../NoPreviewModal/NoPreviewModal';

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
      songIdClicked
    } = this.props;

    if(audioLink) {
      audioControl(audioLink, songIdClicked); // call on the audioControl in MainSection
    } else {
      this.open();
    }
  }

  close() {
    this.setState({showModal: false}); // closes NoPreviewModal
  }

  open() {
    this.setState({ showModal: true }); // opens NoPreviewModal
  }

  render() {

    return(
      <div>
        <div className="audio-button ">
          <i className="material-icons" onClick={this.handleClick}>play_arrow</i>
        </div>
        <NoPreviewModal 
          showModal={this.state.showModal}
          close={this.close}
          exterURL={this.props.exterURL}
        />
      </div>
    );
  }
}

export default PlayButton;