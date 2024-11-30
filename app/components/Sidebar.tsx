import React, { useContext, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import BrushThicknessPopup from "./popover/BrushThicknessPopover";
import { Tooltip } from "antd";
import ColorPickerPopover from "./popover/ColorPickerPopover";
import { CursorContext } from "../context/cursorProvider";
import { BsBorderWidth, BsEraserFill } from "react-icons/bs";
import DarkModeToggle from "./DarkModeToggle";
import ElementWithPopover from "./generic/ElementWithPopover";

interface SidebarPropType {
  pickedColor: string;
  setPickedColor: (color: string) => void;
  selectedPopup: string | null;
  setSelectedPopup: any;
  clearCanvas: () => void;
  handleChange: any;
  brushDets: { brushThickness: number };
  isEraseModeOn: any;
  eraserThickness: any;
  isDarkModeOn: boolean;
  toggleDarkMode: () => void;
}

const Sidebar = ({
  pickedColor,
  setPickedColor,
  selectedPopup,
  setSelectedPopup,
  clearCanvas,
  handleChange,
  brushDets,
  isEraseModeOn,
  eraserThickness,
  isDarkModeOn,
  toggleDarkMode,
}: SidebarPropType) => {
  const { setCustomCursor } = useContext(CursorContext);

  return (
    <div className="fixed z-10 h-screen pl-5 py-5 bg-transparent">
      <div className="h-full duration-200 bg-black/50 dark:bg-white/10 backdrop-blur-lg py-4 px-2 rounded-xl flex flex-col justify-between items-center">
        <div className="flex flex-col items-center justify-center gap-3">
          {/* pen */}

          <button
            type="button"
            onClick={() => handleChange("toggleEraseMode")}
            className="group"
          >
            <div
              className={`text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-white ${
                !isEraseModeOn && "bg-white shadow-lg shadow-white/50"
              }`}
            >
              <FaPen
                className={`text-base text-white group-hover:text-black`}
                color={!isEraseModeOn ? "black" : ""}
              />
            </div>
            <p className="text-[10px] text-center mt-1.5 duration-200 opacity-0 group-hover:opacity-100">
              Pen
            </p>
          </button>
          {/* brush thickness */}
          <ElementWithPopover
            // tooltip={"Thickness"}
            label={"Thickness"}
            component={(props) => (
              <div
                // onClick={() => {
                //   setSelectedPopup((val: any) =>
                //     val === null || val !== "brushThicknessPopup"
                //       ? "brushThicknessPopup"
                //       : null
                //   );
                // }}
                className="text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-white"
                {...props}
              >
                <BsBorderWidth className="text-base text-white group-hover:text-black" />
              </div>
            )}
            content={() => (
              <BrushThicknessPopup
                brushThickness={brushDets?.brushThickness}
                handleChange={handleChange}
                isEraseModeOn={isEraseModeOn}
                eraserThickness={eraserThickness}
              />
            )}
          />
          {/* reset */}

          <button type="button" className="group" onClick={clearCanvas}>
            <div
              onClick={clearCanvas}
              className="text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-white"
            >
              <GrPowerReset className="text-lg text-white group-hover:text-black" />
            </div>
            <p className="text-[10px] text-center mt-1.5 duration-200 opacity-0 group-hover:opacity-100">
              Reset
            </p>
          </button>
          {/* eraser */}
          <button
            type="button"
            onClick={() => {
              handleChange("toggleEraseMode");
              setCustomCursor("eraser");
            }}
            className="group"
          >
            <div
              className={`text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-white ${
                isEraseModeOn && "bg-white shadow-lg shadow-white/50"
              }`}
            >
              <BsEraserFill
                className={`text-lg text-white group-hover:text-black`}
                color={isEraseModeOn ? "black" : ""}
              />
            </div>
            <p className="text-[10px] text-center mt-1.5 duration-200 opacity-0 group-hover:opacity-100">
              Eraser
            </p>
          </button>
          {/* divider */}
          <div className="h-[3px] w-[3px] bg-white rounded-full mx-auto mb-5"></div>
          {/* color picker */}
          <ElementWithPopover
            // tooltip={"Choose Color"}
            label={"Color"}
            component={(props) => (
              <div
                // onClick={() => {
                //   setSelectedPopup((val: any) =>
                //     val === null || val !== "colorPickerPopup"
                //       ? "colorPickerPopup"
                //       : null
                //   );
                // }}
                className="h-10 w-10 border rounded"
                style={{
                  background: pickedColor,
                }}
                {...props}
              ></div>
            )}
            content={() => (
              <ColorPickerPopover
                pickedColor={pickedColor}
                setPickedColor={setPickedColor}
                isDarkModeOn={isDarkModeOn}
              />
            )}
          />
        </div>
        {/* toggle dark mode */}
        <DarkModeToggle
          isDarkModeOn={isDarkModeOn}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </div>
  );
};

export default Sidebar;
