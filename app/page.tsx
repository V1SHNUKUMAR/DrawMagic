"use client";

import { useDraw } from "@/hooks/useDraw";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import { useScreenshot, createFileName } from "use-react-screenshot";

export default function Home() {
  const [pickedColor, setPickedColor] = useState<string>("#000");
  const [selectedPopup, setSelectedPopup] = useState<string | null>(null);
  const [brushDets, setBrushDets] = useState({
    brushThickness: 5,
    brushOpacity: 100,
  });
  const [canvasBgColor, setCanvasBgColor] = useState("#D4D4D8");
  const [isEraseModeOn, setIsEraseModeOn] = useState(false);

  const { canvasRef, onMouseDown, clearCanvas } = useDraw(drawLine);

  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(canvasRef.current);
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);

  function drawLine({ ctx, currPoint, prevPoint }: Draw): void {
    const { x: currX, y: currY } = currPoint;

    let startPoint = prevPoint ?? currPoint;
    ctx.beginPath();
    ctx.lineWidth = brushDets?.brushThickness;
    ctx.strokeStyle = isEraseModeOn ? canvasBgColor : pickedColor;

    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = isEraseModeOn ? canvasBgColor : pickedColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const downloadImage = (
    image: string,
    { name = "screenshot", extension = "png" }
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const handleTakeScreenshot = () => {
    if (!canvasRef?.current) {
      console.error("Canvas reference is null or undefined.");
      return;
    }

    setIsScreenshotLoading(true);

    // Ignore TypeScript checks for takeScreenshot
    // @ts-ignore
    takeScreenshot(canvasRef.current)
      .then((image: string) => {
        downloadImage(image, { name: "draw-magic-board" });
        return "";
      })
      .catch((error: Error) => {
        console.error("Error taking screenshot:", error);
      })
      .finally(() => {
        setIsScreenshotLoading(false);
      });
  };

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

  function handleChange(key: any, data: any) {
    switch (key) {
      case "adjustBrushThickness": {
        setBrushDets({ ...brushDets, brushThickness: data });
        break;
      }
      case "adjustBrushOpacity": {
        setBrushDets({ ...brushDets, brushOpacity: data });
        break;
      }

      case "toggleEraseMode": {
        setIsEraseModeOn(!isEraseModeOn);
        break;
      }

      default:
        break;
    }
  }

  return (
    <div className="h-screen w-full bg-zinc-800">
      <Sidebar
        pickedColor={pickedColor}
        setPickedColor={setPickedColor}
        selectedPopup={selectedPopup}
        setSelectedPopup={setSelectedPopup}
        clearCanvas={clearCanvas}
        brushDets={brushDets}
        handleChange={handleChange}
        isEraseModeOn={isEraseModeOn}
        handleTakeScreenshot={handleTakeScreenshot}
        isScreenshotLoading={isScreenshotLoading}
      />
      <div className="h-full bg-transparent">
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          id="canvasContainer"
          // width={600}
          // height={500}
          className={`w-full h-full`}
          style={{
            backgroundColor: canvasBgColor,
          }}
        />
      </div>
    </div>
  );
}
