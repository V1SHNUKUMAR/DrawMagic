import { useRef, useEffect, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

  const onMouseUp = () => {
    setMouseDown(false);
    prevPoint.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const calculateCanvasPoint = (e: MouseEvent) => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      const currPoint = calculateCanvasPoint(e);

      const ctx = canvas?.getContext("2d");
      if (!ctx || !currPoint) return;

      onDraw({ ctx, currPoint, prevPoint: prevPoint.current });
      prevPoint.current = currPoint;
    };

    // Add eventListener
    if (canvas) {
      canvas.addEventListener("mousemove", handler);
      window.addEventListener("mouseup", onMouseUp);
    }

    // Remove eventListener
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handler);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [onDraw]);

  return { canvasRef, onMouseDown, clearCanvas };
};
