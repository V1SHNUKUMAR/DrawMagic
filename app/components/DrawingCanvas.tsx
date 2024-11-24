import React, { useContext } from "react";
import { CursorContext } from "../context/cursorProvider";

interface DrawingCanvasType {
  canvasRef: any;
  onMouseDown: any;
  canvasBgColor: string;
}

const DrawingCanvas = ({
  canvasRef,
  onMouseDown,
  canvasBgColor,
}: DrawingCanvasType) => {
  const { setCustomCursor, onMouseEnterCanvas, onMouseLeaveCanvas } =
    useContext(CursorContext);

  console.log("context; ", useContext(CursorContext));

  return (
    <div
      id="canvasContainer"
      onMouseEnter={onMouseEnterCanvas}
      onMouseLeave={onMouseLeaveCanvas}
      className="h-full bg-transparent"
    >
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        id="canvas"
        // width={600}
        // height={500}
        className="w-full h-full"
        style={{ backgroundColor: canvasBgColor }}
      />
    </div>
  );
};

export default DrawingCanvas;
