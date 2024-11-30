import React, { useContext, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import BrushThicknessPopup from "./popover/BrushThicknessPopover";
import { Tooltip } from "antd";
import ColorPickerPopover from "./popover/ColorPickerPopover";
import { CursorContext } from "../context/cursorProvider";
import { BsBorderWidth, BsEraserFill } from "react-icons/bs";
import ElementWithPopover from "./generic/ElementWithPopover";
import { IoCamera } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DarkModeToggle from "./DarkModeToggle";

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
  handleTakeScreenshot: any;
  isScreenshotLoading: any;
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
  handleTakeScreenshot,
  isScreenshotLoading,
  isDarkModeOn,
  toggleDarkMode,
}: SidebarPropType) => {
  const { setCustomCursor } = useContext(CursorContext);

  return (
    <div className="fixed z-10 h-screen pl-5 py-5 bg-transparent">
      <div className="h-full duration-200 bg-white dark:bg-white/10 border border-zinc-100 dark:border-zinc-700 backdrop-blur-lg py-4 px-2 rounded-xl flex flex-col justify-between items-center">
        <div className="flex flex-col items-center justify-center gap-3">
          {/* pen */}

          <button
            type="button"
            onClick={() => handleChange("toggleEraseMode")}
            className="group"
          >
            <div
              className={`text-zinc-700 rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-blue-500 dark:group-hover:bg-blue-300 ${
                !isEraseModeOn &&
                "bg-blue-500 dark:bg-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-blue-300/50"
              }`}
            >
              <FaPen
                className={`text-base group-hover:text-white dark:group-hover:text-zinc-700 ${
                  !isEraseModeOn
                    ? "text-white dark:text-zinc-700"
                    : "text-zinc-700 dark:text-white"
                }`}
                // color={!isEraseModeOn ? "black" : ""}
              />
            </div>
            <p className="text-[10px] text-center mt-1.5 text-zinc-700 dark:text-white duration-200 opacity-0 group-hover:opacity-100">
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
                className="text-zinc-700 rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-blue-500 dark:group-hover:bg-blue-300"
                {...props}
              >
                <BsBorderWidth className="text-lg text-zinc-700 dark:text-white group-hover:text-white dark:group-hover:text-zinc-700" />
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
              className="text-zinc-700 rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-blue-500 dark:group-hover:bg-blue-300"
            >
              <GrPowerReset className="text-lg text-zinc-700 dark:text-white group-hover:text-white dark:group-hover:text-zinc-700" />
            </div>
            <p className="text-[10px] text-center mt-1.5 text-zinc-700 dark:text-white duration-200 opacity-0 group-hover:opacity-100">
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
              className={`text-zinc-700 rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-blue-500 dark:group-hover:bg-blue-300 ${
                isEraseModeOn &&
                "bg-blue-500 dark:bg-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-blue-300/50"
              }`}
            >
              <BsEraserFill
                className={`text-base group-hover:text-white dark:group-hover:text-zinc-700 ${
                  isEraseModeOn
                    ? "text-white dark:text-zinc-700"
                    : "text-zinc-700 dark:text-white"
                }`}
                // color={isEraseModeOn ? "black" : ""}
              />
            </div>
            <p className="text-[10px] text-center mt-1.5 text-zinc-700 dark:text-white duration-200 opacity-0 group-hover:opacity-100">
              Eraser
            </p>
          </button>

          {/* divider */}
          <div className="h-[1px] w-[35px] bg-black/30 dark:bg-white/30 rounded-full mx-auto mb-3"></div>

          {/* take screenshot */}
          <button
            type="button"
            onClick={handleTakeScreenshot}
            className="group"
          >
            <div
              className={`text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] mx-auto duration-200 group-hover:bg-blue-500 dark:group-hover:bg-blue-300`}
            >
              {isScreenshotLoading ? (
                <AiOutlineLoading3Quarters
                  className={`animate-spin text-xl text-zinc-700 dark:text-white group-hover:text-white dark:group-hover:text-zinc-700`}
                  strokeWidth={2}
                />
              ) : (
                <IoCamera
                  className={`text-xl text-zinc-700 dark:text-white group-hover:text-white dark:group-hover:text-zinc-700`}
                />
              )}
            </div>
            <p className="text-[10px] text-center mt-1.5 text-zinc-700 dark:text-white duration-200 opacity-0 group-hover:opacity-100">
              Screenshot
            </p>
          </button>
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
