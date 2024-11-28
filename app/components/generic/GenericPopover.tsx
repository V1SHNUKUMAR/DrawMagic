import { useEffect, useRef, useState } from "react";

interface GenericPopupOverProps {
  isVisible: boolean;
  content: JSX.Element | string;
  closePopover: () => void;
  position: { top: number; left: number };
  PopoverRef: any;
}

const GenericPopupOver: React.FC<GenericPopupOverProps> = ({
  isVisible,
  content,
  closePopover,
  position,
  PopoverRef,
}) => {
  // const PopoverRef = useRef<HTMLDivElement>(null);

  // Close Popup when clicking outside
  useEffect(() => {
    const canvasElement = document.getElementById("canvas"); // Selecting the canvas
    const PopoverElement = PopoverRef.current;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        PopoverElement &&
        !PopoverElement.contains(event.target as Node) &&
        canvasElement &&
        !canvasElement.contains(event.target as Node) // Also checks if clicked outside the canvas
      ) {
        console.log("clicked");
        closePopover();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      canvasElement?.addEventListener("click", closePopover);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      canvasElement?.addEventListener("click", closePopover);
    };
  }, [isVisible, closePopover]);

  return (
    <div
      ref={PopoverRef}
      className={`fixed z-50 bg-white/70 dark:bg-black/95 text-black dark:text-white backdrop-blur-md rounded overflow-hidden shadow-lg duration-300 transition ${
        isVisible
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 -translate-x-2 pointer-events-none"
      }`}
      style={{ ...position }}
    >
      {/* <button
        className="absolute top-0 right-0 p-2 text-gray-600"
        onClick={closePopover}
      >
        &times;
      </button> */}
      <div>{content}</div>
    </div>
  );
};

export default GenericPopupOver;
