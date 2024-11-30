import React, { useContext } from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import BrushThicknessPopup from "./popover/BrushThicknessPopover";
import { Tooltip } from "antd";
import ElementWidthPopover from "./generic/ElementWithPopover";
import ColorPickerPopover from "./popover/ColorPickerPopover";
import { CursorContext } from "../context/cursorProvider";
import { BsBorderWidth, BsEraserFill } from "react-icons/bs";
import { IoCamera } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
}: SidebarPropType) => {
  const { setCustomCursor } = useContext(CursorContext);

  return (
    <div className="fixed z-10 h-screen pl-5 py-5 bg-transparent">
      <div className="h-full bg-black/50 backdrop-blur-lg py-5 px-5 rounded-xl flex flex-col justify-center items-center">
        <div className="space-y-5">
          {/* pen */}
          <Tooltip
            overlayClassName="p-0"
            overlayStyle={{ fontSize: "12px" }}
            mouseEnterDelay={0.75}
            title={"Pen"}
          >
            <div>
              <button
                type="button"
                onClick={() => handleChange("toggleEraseMode")}
                className={`group text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] duration-200 hover:bg-white ${
                  !isEraseModeOn && "bg-white shadow-lg shadow-white/50"
                }`}
              >
                <FaPen
                  className={`text-base text-white group-hover:text-black`}
                  color={!isEraseModeOn ? "black" : ""}
                />
              </button>
            </div>
          </Tooltip>
          {/* brush thickness */}
          <ElementWidthPopover
            tooltip={"Thickness"}
            component={(props) => (
              <button
                type="button"
                onClick={() => {
                  setSelectedPopup((val: any) =>
                    val === null || val !== "brushThicknessPopup"
                      ? "brushThicknessPopup"
                      : null
                  );
                }}
                className="group text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] duration-200 hover:bg-white"
                {...props}
              >
                <BsBorderWidth className="text-base text-white group-hover:text-black" />
              </button>
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
          <Tooltip
            overlayClassName="p-0"
            overlayStyle={{ fontSize: "12px" }}
            mouseEnterDelay={0.75}
            title={"Erase all"}
          >
            <div>
              <button
                type="button"
                onClick={clearCanvas}
                className="group text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] duration-200 hover:bg-white"
              >
                <GrPowerReset className="text-lg text-white group-hover:text-black" />
              </button>
            </div>
          </Tooltip>
          {/* eraser */}
          <Tooltip
            overlayClassName="p-0"
            overlayStyle={{ fontSize: "12px" }}
            mouseEnterDelay={0.75}
            title={"Eraser"}
          >
            <div>
              <button
                type="button"
                onClick={() => {
                  handleChange("toggleEraseMode");
                  setCustomCursor("eraser");
                }}
                className={`group text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] duration-200 hover:bg-white ${
                  isEraseModeOn && "bg-white shadow-lg shadow-white/50"
                }`}
              >
                <BsEraserFill
                  className={`text-lg text-white group-hover:text-black`}
                  color={isEraseModeOn ? "black" : ""}
                />
              </button>
            </div>
          </Tooltip>
          {/* divider */}
          <div className="h-[3px] w-[3px] bg-white rounded-full mx-auto"></div>
          {/* take screenshot */}
          <Tooltip
            overlayClassName="p-0"
            overlayStyle={{ fontSize: "12px" }}
            mouseEnterDelay={0.75}
            title={"Take Screenshot"}
          >
            <div>
              <button
                type="button"
                onClick={handleTakeScreenshot}
                className={`group text-black rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px] duration-200 hover:bg-white`}
              >
                {isScreenshotLoading ? (
                  <AiOutlineLoading3Quarters
                    className={`animate-spin text-xl text-white group-hover:text-black`}
                    strokeWidth={2}
                  />
                ) : (
                  <IoCamera
                    className={`text-xl text-white group-hover:text-black`}
                  />
                )}
              </button>
            </div>
          </Tooltip>
          {/* color picker */}
          <ElementWidthPopover
            positionProps={{ top: "auto", bottom: "0" }}
            tooltip={"Choose Color"}
            component={(props) => (
              <button
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
              ></button>
            )}
            content={() => (
              <ColorPickerPopover
                pickedColor={pickedColor}
                setPickedColor={setPickedColor}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
