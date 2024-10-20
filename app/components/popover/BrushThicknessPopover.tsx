import { InputNumber, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface BrushThicknessPopupPropTypes {
  brushThickness: number;
  handleChange: any;
}

const BrushThicknessPopup = ({
  brushThickness,
  handleChange,
}: BrushThicknessPopupPropTypes) => {
  const [selectedBrushThickness, setSelectedBrushThickness] =
    useState<number>(5);
  return (
    <div className="p-3 pr-0">
      <div className="flex items-center gap-2">
        <Slider
          className="min-w-[150px]"
          min={4}
          max={100}
          onChange={(val) => {
            setSelectedBrushThickness(val || 0);
            handleChange("adjustBrushThickness", val);
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
  );
};

export default BrushThicknessPopup;
