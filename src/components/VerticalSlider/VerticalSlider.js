import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './VerticalSlider.css';
import { RangeSlider } from 'rsuite';

const VerticalSlider = () => {
  return (
    <div className='slider-container'>
      <RangeSlider
        className='mood-score-slider' 
        min={0}
        step={10}
        max={100}
        defaultValue={[10, 50]}
        vertical
        graduated
        onChange={value => {
          console.log('range ', value);
        }}
        renderMark={mark => {
          return <span>{mark}</span>;
        }}
      />
    </div>
  );
};

export default VerticalSlider;