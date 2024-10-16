"use client";

import { useDraw } from "@/hooks/useDraw";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [pickedColor, setPickedColor] = useState<string>("#000");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const { canvasRef, onMouseDown, clearCanvas } = useDraw(drawLine);

  function drawLine({ ctx, currPoint, prevPoint }: Draw): void {
    const { x: currX, y: currY } = currPoint;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = pickedColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = pickedColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Get computed styles
      const computedStyle = getComputedStyle(canvas);
      const width = parseInt(computedStyle.width);
      const height = parseInt(computedStyle.height);

      // Set canvas internal width and height to match CSS dimensions
      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-800 flex flex-col md:flex-row items-center">
      <Sidebar
        pickedColor={pickedColor}
        setPickedColor={setPickedColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        clearCanvas={clearCanvas}
      />
      <div className="flex-1 h-full shadow-2xl rounded-l-3xl bg-transparent overflow-hidden">
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          // width={600}
          // height={500}
          className="w-full h-full bg-zinc-300"
        />
      </div>
    </div>
  );
}
