import { InputNumber, Slider } from "antd";
import React, { useEffect, useRef } from "react";

interface BrushThicknessPopupPropTypes {
  selectedPopup: string | null;
  setSelectedPopup: (show: string | null) => void;
  brushThickness: number;
  handleChange: any;
}

const BrushThicknessPopup = ({
  selectedPopup,
  setSelectedPopup,
  brushThickness,
  handleChange,
}: BrushThicknessPopupPropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedPopup("brushThicknessPopup");
      }
    };

    if (selectedPopup === "brushThicknessPopup") {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPopup, setSelectedPopup]);

  //   console.log("check", selectedPopup === "brushThicknessPopup");

  console.log("selectedPopup", selectedPopup);

  return (
    <div
      ref={modalRef}
      className={`bg-white/90 backdrop-blur-sm overflow-hidden absolute top-0 left-full z-40 shadow-lg duration-300 border origin-top-left ${
        selectedPopup === "brushThicknessPopup"
          ? "ml-2 opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-3 pr-0">
        <div className="flex items-center gap-2">
          <Slider
            className="min-w-[150px] a"
            min={4}
            max={100}
            onChange={(val) => {
              console.log("val: ", val);
              handleChange("adjustBrushThickness", val);
            }}
            value={typeof brushThickness === "number" ? brushThickness : 0}
          />
          <InputNumber
            min={4}
            max={100}
            style={{ margin: "0 16px" }}
            value={brushThickness}
            onChange={(val) => handleChange("adjustBrushThickness", val)}
          />
        </div>
      </div>
    </div>
  );
};

export default BrushThicknessPopup;
