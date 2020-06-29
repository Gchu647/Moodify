import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './MoodButtonGroup.css';
import { Button, ButtonGroup, ButtonToolbar } from 'rsuite';

const MoodButtonGroup = ({ appearance, color }) => (
  <div className='MoodButtonGroup'>
    <ButtonToolbar>
    <ButtonGroup>
      <Button appearance={appearance} color={color}>Happy</Button>
      <Button appearance={appearance} color={color}>Sad</Button>
    </ButtonGroup>
  </ButtonToolbar>
  </div>
);

export default MoodButtonGroup;