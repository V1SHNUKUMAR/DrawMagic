import React from "react";
import ColorPickerModal from "../modals/ColorPickerModal";
import { GrPowerReset } from "react-icons/gr";
import { FaCircle } from "react-icons/fa";
import BrushThicknessPopup from "./popups/BrushThicknessPopup";
import { Tooltip } from "antd";

interface SidebarPropType {
  pickedColor: string;
  setPickedColor: (color: string) => void;
  selectedPopup: string | null;
  setSelectedPopup: any;
  clearCanvas: () => void;
  handleChange: any;
  brushDets: { brushThickness: number };
}

const Sidebar = ({
  pickedColor,
  setPickedColor,
  selectedPopup,
  setSelectedPopup,
  clearCanvas,
  handleChange,
  brushDets,
}: SidebarPropType) => {
  return (
    <div className="h-screen py-5 px-10 flex flex-col justify-center items-center">
      <div>
        <div className="space-y-5">
          <div className="relative">
            <Tooltip overlayClassName="!p-0" title={"Pick color"}>
              <button
                onClick={() => {
                  setSelectedPopup((val: any) =>
                    val === null || val !== "colorPickerPopup"
                      ? "colorPickerPopup"
                      : null
                  );
                }}
                className="h-10 w-10 border rounded"
                style={{
                  background: pickedColor,
                }}
              ></button>
            </Tooltip>
            <ColorPickerModal
              selectedPopup={selectedPopup}
              setSelectedPopup={setSelectedPopup}
              pickedColor={pickedColor}
              setPickedColor={setPickedColor}
            />
          </div>
          <Tooltip overlayClassName="!p-0" title={"Pick color"}>
            <button
              type="button"
              onClick={clearCanvas}
              className="text-black border rounded-md w-full aspect-square py-2 flex justify-center items-center text-sm"
            >
              <GrPowerReset className="text-lg" color="white" />
            </button>
          </Tooltip>
          <div className="relative">
            <Tooltip overlayClassName="!p-0" title={"Thickness"}>
              <button
                type="button"
                onClick={() => {
                  setSelectedPopup((val: any) =>
                    val === null || val !== "brushThicknessPopup"
                      ? "brushThicknessPopup"
                      : null
                  );
                }}
                className="text-black border rounded-md w-full aspect-square py-2 flex justify-center items-center text-sm"
              >
                <FaCircle color="white" />
              </button>
            </Tooltip>
            <BrushThicknessPopup
              selectedPopup={selectedPopup}
              setSelectedPopup={setSelectedPopup}
              brushThickness={brushDets?.brushThickness}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
