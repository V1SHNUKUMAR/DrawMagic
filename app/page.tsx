"use client";

import { useDraw } from "@/hooks/useDraw";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import CursorProvider, { CursorContext } from "./context/cursorProvider";
import DrawingCanvas from "./components/DrawingCanvas";

export default function Home() {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);
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
            isDarkModeOn={isDarkModeOn}
            toggleDarkMode={toggleDarkMode}
          />
          <DrawingCanvas
            canvasRef={canvasRef}
            onMouseDown={onMouseDown}
            canvasBgColor={canvasBgColor}
          />
        </>
      </CursorProvider>
    </div>
  );
}
