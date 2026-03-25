import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import styled from "styled-components";

const СanvasWrapper = styled.canvas`
  cursor: crosshair;
  width: 100%;
  height: 100%;
  min-height: 75vh;
  background-color: #fff;
  border-radius: 20px;
`;

export function CanvasBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const { activeTool } = useSelector((state: RootState) => state.tool);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      return;
    }

    canvasContext.lineCap = "round";
    canvasContext.lineWidth = 3;
  }, []);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

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

  return (
    <СanvasWrapper
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={drawMove}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={drawMove}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
    />
  );
}
