import React, { useContext } from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaCircle } from "react-icons/fa";
import BrushThicknessPopup from "./popover/BrushThicknessPopover";
import { Tooltip } from "antd";
import GenericPopupOver from "./generic/GenericPopover";
import ElementWidthPopover from "./generic/ElementWithPopover";
import ColorPickerPopover from "./popover/ColorPickerPopover";
import { CursorContext } from "../context/cursorProvider";

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
  // const { setCustomCursor } = useContext(CursorContext);

  return (
    <div className="h-screen py-5 px-10 flex flex-col justify-center items-center">
      <div>
        <div className="space-y-5">
          <ElementWidthPopover
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
                className="text-black border rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px]"
              >
                <GrPowerReset className="text-lg" color="white" />
              </button>
            </div>
          </Tooltip>
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
                className="text-black border rounded-md p-2 aspect-square flex justify-center items-center text-sm h-[40px]"
                {...props}
              >
                <FaCircle color="white" />
              </button>
            )}
            content={() => (
              <BrushThicknessPopup
                brushThickness={brushDets?.brushThickness}
                handleChange={handleChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
