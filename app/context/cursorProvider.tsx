import React, { createContext, useEffect, useState } from "react";

export const CursorContext = createContext<any>(null);

const CursorProvider = ({ children }: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState<string | null>("pen");
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  const onMouseMove = (event: MouseEvent) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
  };

  const onMouseEnterCanvas = () => {
    document.body.style.cursor = "none";
    setIsCanvasHovered(true);
  };
  const onMouseLeaveCanvas = () => {
    document.body.style.cursor = "auto";
    setIsCanvasHovered(false);
  };
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const setCustomCursor = (cursor: string | null) => {
    setCursor(cursor);
  };

  const { x, y } = mousePosition;

  //   const getCustomCursor = {
  //     eraser:
  //   };

  return (
    <CursorContext.Provider
      value={{ setCustomCursor, onMouseEnterCanvas, onMouseLeaveCanvas }}
    >
      {children}
      {isCanvasHovered && cursor && (
        <div
          //   className={`custom-cursor cursor-${cursor}`}
          className={`${cursor === "pen" && ""}`}
          style={{
            left: `${x - 5}px`,
            top: `${y - 5}px`,
            position: "absolute",
            pointerEvents: "none",
            zIndex: 9999,
            height: cursor === "pen" ? "10px" : "auto",
            width: cursor === "pen" ? "10px" : "auto",
            backgroundColor: cursor === "pen" ? "black" : "",
            borderRadius: cursor === "pen" ? "100px" : "",
          }}
        >
          {/* {cursor} */}
        </div>
      )}
    </CursorContext.Provider>
  );
};

export default CursorProvider;