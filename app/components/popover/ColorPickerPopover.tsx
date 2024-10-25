import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

interface ColorPickerPropType {
  pickedColor: string;
  setPickedColor: (color: string) => void;
}

const ColorPickerPopover = ({
  pickedColor,
  setPickedColor,
}: ColorPickerPropType) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [recentColorsList, setRecentColorsList] = useState<string[]>([]);

  const addColorToRecent = (selectedColor: string) => {
    setRecentColorsList((prevList: string[]) => {
      // Create a copy of the current list to work with
      let updatedList = [...prevList];

      // If the color already exists in the list, remove it first
      const elementIndex = updatedList.indexOf(selectedColor);
      if (elementIndex !== -1) {
        updatedList.splice(elementIndex, 1); // Remove the existing color
      }

      // Add the new color to the beginning of the list
      updatedList.unshift(selectedColor);

      // If the list exceeds the maximum length (10), remove the last color
      if (updatedList.length > 10) {
        updatedList.pop(); // Remove the last element
      }

      return updatedList;
    });
  };

  return (
    <div className="p-3 space-y-3">
      <SketchPicker
        className="!shadow-none min-w-[255px]"
        color={selectedColor}
        onChange={(color: ColorResult) => setSelectedColor(color.hex)}
        onChangeComplete={(color: ColorResult) => {
          setPickedColor(color.hex);
          addColorToRecent(color.hex);
        }}
        presetColors={recentColorsList}
      />
    </div>
  );
};

export default ColorPickerPopover;
