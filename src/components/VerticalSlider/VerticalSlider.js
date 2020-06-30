import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './VerticalSlider.css';
import { RangeSlider } from 'rsuite';

const VerticalSlider = ({ setMoodRange }) => {
  return (
    <div className='slider-container'>
      <RangeSlider
        className='mood-score-slider' 
        min={0}
        step={10}
        max={100}
        defaultValue={[0, 100]}
        vertical
        graduated
        onChange={arr => {
          setMoodRange(arr);
        }}
        renderMark={mark => {
          return <span>{mark}</span>;
        }}
      />
    </div>
  );
};

export default VerticalSlider;