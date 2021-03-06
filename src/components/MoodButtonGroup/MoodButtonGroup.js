import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './MoodButtonGroup.css';
import { Button, ButtonGroup, ButtonToolbar } from 'rsuite';

const MoodButtonGroup = props => {
  const {
    appearance,
    color,
    happySort,
    sadSort
  } = props;
  
  return (
    <div className='MoodButtonGroup'>
      <ButtonToolbar>
        <ButtonGroup>
          <Button appearance={appearance} color={color} onClick={happySort}>Happy</Button>
          <Button onClick={sadSort} appearance={appearance} color={color}>Sad</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  )
};

export default MoodButtonGroup;