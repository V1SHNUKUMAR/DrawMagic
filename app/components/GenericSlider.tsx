// @ts-nocheck

import React from "react";

import "../stylesheets/genericSlider.css";

interface GenericSliderPropTypes {
  value: number;
  handleOnChange: any;
  min: number;
  max: number;
  className: string;
}

const GenericSlider = ({
  value,
  handleOnChange,
  min,
  max,
  className,
}: GenericSliderPropTypes) => {
  return (
    <label className={`slider ${className}`}>
      <input
        type="range"
        className="level"
        min={min}
        max={max}
        value={value}
        onChange={handleOnChange}
      />
    </label>
  );
};

export default GenericSlider;
