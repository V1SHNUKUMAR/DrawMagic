import React, { useContext } from "react";
import { CursorContext } from "../context/cursorProvider";

interface DrawingCanvasType {
  canvasRef: any;
  onMouseDown: any;
}

const DrawingCanvas = ({ canvasRef, onMouseDown }: DrawingCanvasType) => {
  const { setCustomCursor, onMouseEnterCanvas, onMouseLeaveCanvas } =
    useContext(CursorContext);

  console.log("context; ", useContext(CursorContext));

  return (
    <div
      id="canvasContainer"
      onMouseEnter={onMouseEnterCanvas}
      onMouseLeave={onMouseLeaveCanvas}
      className="flex-1 my-5 h-full shadow-2xl rounded-l-3xl bg-transparent overflow-hidden"
    >
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        id="canvas"
        // width={600}
        // height={500}
        className="w-full h-full bg-zinc-300"
      />
    </div>
  );
};

export default DrawingCanvas;
