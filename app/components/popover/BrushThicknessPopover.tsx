import { InputNumber, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";

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

  return (
    <div className="p-3 pr-0 space-y-1">
      <div>
        <p className="text-xs text-gray-600 dark:text-gray-200 font-medium">
          Brush
        </p>
        <div className="flex items-center gap-2">
          <Slider
            className="min-w-[150px]"
            min={4}
            max={100}
            onChange={(val) => {
              if (isEraseModeOn) {
                setCurrEraserThickness(val || 0);
                handleChange("adjustEraserThickness", val);
              } else {
                setSelectedBrushThickness(val || 0);
                handleChange("adjustBrushThickness", val);
              }
            }}
            value={selectedBrushThickness || 0}
          />
          <InputNumber
            min={4}
            max={100}
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
        <p className="text-xs text-gray-600 dark:text-gray-200 font-medium">
          Eraser
        </p>
        <div className="flex items-center gap-2">
          <Slider
            className="min-w-[150px]"
            min={4}
            max={100}
            onChange={(val) => {
              setCurrEraserThickness(val || 0);
              handleChange("adjustEraserThickness", val);
            }}
            value={currEraserThickness || 0}
          />
          <InputNumber
            min={4}
            max={100}
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
