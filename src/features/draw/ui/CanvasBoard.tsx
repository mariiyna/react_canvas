import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import {useCanvas} from "@/features/draw/model/useCanvas.ts";
import {useDrawing} from "@/features/draw/model/useDrawing.ts";
import eraser from "@/shared/assets/icons/eraser.png";
import paintBrush from "@/shared/assets/icons/paint-brush.png";

export function CanvasBoard() {
  const { canvasRef, getCoordinates } = useCanvas();
  const { activeTool } = useSelector((state: RootState) => state.tool);
  const { startDrawing, drawMove, stopDrawing } = useDrawing(canvasRef, activeTool, getCoordinates);

  const cursor = activeTool === "eraser"
    ? `url(${eraser}) 0 32, crosshair`
    : `url(${paintBrush}) 0 32, crosshair`;

  return (
    <canvas
      ref={canvasRef}
      className='w-full h-full bg-white rounded-xl min-h-[75vh]'
      style={{ cursor }}
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
