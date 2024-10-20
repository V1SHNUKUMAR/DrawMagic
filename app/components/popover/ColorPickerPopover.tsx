import React, { useState } from "react";
import { ColorResult, ChromePicker } from "react-color";

interface ColorPickerPropType {
  pickedColor: string;
  setPickedColor: (color: string) => void;
}

const ColorPickerPopover = ({
  pickedColor,
  setPickedColor,
}: ColorPickerPropType) => {
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div>
      <ChromePicker
        color={selectedColor}
        onChange={(color: ColorResult) => {
          setSelectedColor(color.hex);
          setPickedColor(color.hex);
        }}
      />
    </div>
  );
};

export default ColorPickerPopover;
