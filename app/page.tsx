// @ts-nocheck
"use client";

import { useDraw } from "@/hooks/useDraw";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import CursorProvider, { CursorContext } from "./context/cursorProvider";
import DrawingCanvas from "./components/DrawingCanvas";
import { useScreenshot, createFileName } from "use-react-screenshot";

export default function Home() {
  const [isDarkModeOn, setIsDarkModeOn] = useState(true);
  const [pickedColor, setPickedColor] = useState<string>(
    isDarkModeOn ? "white" : "#000"
  );
  const [selectedPopup, setSelectedPopup] = useState<string | null>(null);
  const [brushDets, setBrushDets] = useState({
    brushThickness: 5,
    brushOpacity: 100,
  });
  const [canvasBgColor, setCanvasBgColor] = useState(
    isDarkModeOn ? "#18181b" : "#D4D4D8"
  );
  const [eraserThickness, setEraserThickness] = useState(5);
  const [isEraseModeOn, setIsEraseModeOn] = useState(false);

  const { canvasRef, onMouseDown, clearCanvas } = useDraw(drawLine);

  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(canvasRef.current);
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);

  function drawLine({ ctx, currPoint, prevPoint }: Draw): void {
    const { x: currX, y: currY } = currPoint;

    let startPoint = prevPoint ?? currPoint;
    ctx.beginPath();
    ctx.lineWidth = isEraseModeOn ? eraserThickness : brushDets?.brushThickness;
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
    takeScreenshot(canvasRef.current)
      //@ts-expect-error ( This is type isse in the takescreenshot )
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
      case "adjustEraserThickness": {
        setEraserThickness(data);
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

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkModeOn;
    setIsDarkModeOn(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    // Initialize dark mode based on user preference or system settings
    const darkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkModeOn(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  useEffect(() => {
    setCanvasBgColor(isDarkModeOn ? "#18181b" : "#D4D4D8");
    setPickedColor(isDarkModeOn ? "white" : "#000");
  }, [isDarkModeOn]);

  return (
    <div className="h-screen w-full bg-zinc-800">
      <CursorProvider>
        <>
          <Sidebar
            pickedColor={pickedColor}
            setPickedColor={setPickedColor}
            selectedPopup={selectedPopup}
            setSelectedPopup={setSelectedPopup}
            clearCanvas={clearCanvas}
            brushDets={brushDets}
            handleChange={handleChange}
            isEraseModeOn={isEraseModeOn}
            eraserThickness={eraserThickness}
            handleTakeScreenshot={handleTakeScreenshot}
            isScreenshotLoading={isScreenshotLoading}
            isDarkModeOn={isDarkModeOn}
            toggleDarkMode={toggleDarkMode}
            handleTakeScreenshot={handleTakeScreenshot}
            isScreenshotLoading={isScreenshotLoading}
          />
          <DrawingCanvas
            canvasRef={canvasRef}
            onMouseDown={onMouseDown}
            canvasBgColor={canvasBgColor}
          />
          {/* <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center"> */}
          <div
            className={`fixed top-0 left-0 z-50 w-full h-full border border-black duration-1000 ${
              image
                ? "scale-0 opacity-0 visible"
                : "scale-100 opacity-100 invisible"
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-center object-contain"
            />
          </div>
          {/* </div> */}
        </>
      </CursorProvider>
    </div>
  );
}
