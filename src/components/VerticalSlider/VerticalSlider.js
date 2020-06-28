import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './VerticalSlider.css';
import { RangeSlider } from 'rsuite';

const VerticalSlider = () => {
  return (
    <div className='slider-container'>
      <RangeSlider 
        className='mood-score-slider' 
        defaultValue={[10, 50]} 
        onChange={value => {
          console.log('range ', value);
        }}
      />
    </div>
  );
};

export default VerticalSlider;