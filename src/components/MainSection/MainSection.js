import React, {Component} from 'react';
import BillboardSongs from '../BillboardSongs/BillboardSongs';

class MainSection extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { 
      songTracks,
      sortOption,
      moodRange
    } = this.props;

    return (
      <div>
        <BillboardSongs 
            songTracks={songTracks}
            sortOption={sortOption}
            moodRange={moodRange}
          />
      </div>
    )
  }
}

export default MainSection;