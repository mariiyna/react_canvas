import type {Tool} from "@/features/draw/model/types.ts";
import React, {useRef} from "react";

export const useDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  activeTool: Tool,
  getCoordinates: (e: React.MouseEvent | React.TouchEvent) => { x: number; y: number }
) => {
  const drawing = useRef(false);

  const handleDraw = (
    event: React.MouseEvent | React.TouchEvent,
    isMoving: boolean,
  ) => {

    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext("2d");
    if (!canvasContext || !canvas) {
      return;
    }

    const { x, y } = getCoordinates(event);

    canvasContext.globalCompositeOperation =
      activeTool === "eraser" ? "destination-out" : "source-over";

    if (activeTool !== "eraser") {
      canvasContext.strokeStyle = "#000";
    }

    if (!isMoving) {
      canvasContext.beginPath();
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
      drawing.current = true;
      return;
    }

    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    handleDraw(event, false);
  };

  const drawMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (drawing.current) {
      handleDraw(event, true);
    }
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  return { startDrawing, drawMove, stopDrawing };
}