import React from "react";
import ColorPickerModal from "../modals/ColorPickerModal";
import { GrPowerReset } from "react-icons/gr";

interface SidebarPropType {
  pickedColor: string;
  setPickedColor: (color: string) => void;
  showColorPicker: boolean;
  setShowColorPicker: (
    value: boolean | ((currVal: boolean) => boolean)
  ) => void;
  clearCanvas: () => void;
}

const Sidebar = ({
  pickedColor,
  setPickedColor,
  showColorPicker,
  setShowColorPicker,
  clearCanvas,
}: SidebarPropType) => {
  return (
    <div className="h-screen py-5 px-10 flex flex-col justify-center items-center">
      <div>
        <div className="space-y-5">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker((currVal: boolean) => !currVal);
              }}
              className="h-10 w-10 border rounded"
              style={{
                background: pickedColor,
              }}
            ></button>
            <ColorPickerModal
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              pickedColor={pickedColor}
              setPickedColor={setPickedColor}
            />
          </div>
          <button
            type="button"
            onClick={clearCanvas}
            className="text-black border rounded-md w-full aspect-square py-2 flex justify-center items-center text-sm"
          >
            <GrPowerReset className="text-lg" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
