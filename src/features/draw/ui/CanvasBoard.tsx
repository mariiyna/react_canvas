import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import styled from "styled-components";
import {useCanvas} from "@/features/draw/model/useCanvas.ts";
import {useDrawing} from "@/features/draw/model/useDrawing.ts";

const СanvasWrapper = styled.canvas`
  cursor: crosshair;
  width: 100%;
  height: 100%;
  min-height: 75vh;
  background-color: #fff;
  border-radius: 20px;
`;

export function CanvasBoard() {
  const { canvasRef, getCoordinates } = useCanvas();
  const { activeTool } = useSelector((state: RootState) => state.tool);
  const { startDrawing, drawMove, stopDrawing } = useDrawing(canvasRef, activeTool, getCoordinates);

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
