import React, { useEffect, useRef } from "react";
import { ColorResult, ChromePicker } from "react-color";

interface ColorPickerPropType {
  selectedPopup: string | null;
  setSelectedPopup: (show: string | null) => void;
  pickedColor: string;
  setPickedColor: (color: string) => void;
}

const ColorPickerModal = ({
  selectedPopup,
  setSelectedPopup,
  pickedColor,
  setPickedColor,
}: ColorPickerPropType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedPopup("colorPickerPopup");
      }
    };

    if (selectedPopup === "colorPickerPopup") {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPopup, setSelectedPopup]);

  return (
    <div
      ref={modalRef}
      className={`overflow-hidden absolute top-0 left-full z-40 shadow-lg duration-300 border origin-top-left ${
        selectedPopup === "colorPickerPopup"
          ? "ml-2 opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <ChromePicker
        color={pickedColor}
        onChange={(color: ColorResult) => setPickedColor(color.hex)}
      />
    </div>
  );
};

export default ColorPickerModal;
