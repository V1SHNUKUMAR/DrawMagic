import { InputNumber, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import GenericSlider from "../GenericSlider";

interface BrushThicknessPopupPropTypes {
  brushThickness: number;
  handleChange: any;
  isEraseModeOn: boolean;
  eraserThickness: any;
}

const BrushThicknessPopup = ({
  brushThickness,
  handleChange,
  isEraseModeOn,
  eraserThickness,
}: BrushThicknessPopupPropTypes) => {
  const [selectedBrushThickness, setSelectedBrushThickness] = useState<number>(
    brushThickness || 5
  );
  const [currEraserThickness, setCurrEraserThickness] = useState<number>(
    eraserThickness || 5
  );

  const handleThicknessChange = (type: string, value: any) => {
    switch (type) {
      case "brush":
        setSelectedBrushThickness(value);
        handleChange("adjustBrushThickness", value);
        break;

      case "eraser":
        setCurrEraserThickness(value);
        handleChange("adjustEraserThickness", value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="p-3 pr-0 space-y-4">
      <div>
        <p className="text-xs text-gray-600 dark:text-gray-200 font-medium mb-1">
          Brush
        </p>
        <div className="flex items-center gap-2">
          <GenericSlider
            value={selectedBrushThickness || 0}
            handleOnChange={(e: any) =>
              handleThicknessChange("brush", Number(e.target.value))
            }
            min={0}
            max={50}
            className="w-[150px]"
          />
          <InputNumber
            min={0}
            max={50}
            style={{ margin: "0 16px" }}
            value={selectedBrushThickness || 0}
            onChange={(val) => {
              setSelectedBrushThickness(val || 0);
              handleChange("adjustBrushThickness", val);
            }}
          />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-600 dark:text-gray-200 font-medium mb-1">
          Eraser
        </p>
        <div className="flex items-center gap-2">
          <GenericSlider
            value={currEraserThickness || 0}
            handleOnChange={(e: any) =>
              handleThicknessChange("eraser", Number(e.target.value))
            }
            min={0}
            max={50}
            className="w-[150px]"
          />
          <InputNumber
            min={0}
            max={50}
            style={{ margin: "0 16px" }}
            value={currEraserThickness || 0}
            onChange={(val) => {
              setCurrEraserThickness(val || 0);
              handleChange("adjustEraserThickness", val);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BrushThicknessPopup;
