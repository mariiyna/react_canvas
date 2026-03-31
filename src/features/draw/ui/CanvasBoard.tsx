import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import {useCanvas} from "@/features/draw/model/useCanvas.ts";
import {useDrawing} from "@/features/draw/model/useDrawing.ts";
import eraser from "@/shared/assets/icons/eraser.png";
import paintBrush from "@/shared/assets/icons/paint-brush.png";
import { MdDelete } from "react-icons/md";
import {BASE_COLOR, MAX_WIDTH, MIN_WIDTH} from "@/features/draw/model/CONSTS.ts";
import React, {useState} from "react";
import {ManagePanel} from "@/features/manageDraw/ui/ManagePanel.tsx";

export function CanvasBoard() {
  const [toolWidth, setToolWidth] = useState(MIN_WIDTH)
  const [toolColor, setToolColor] = useState(BASE_COLOR)

  const { canvasRef, getCoordinates, clearCanvas } = useCanvas(toolWidth);
  const { activeTool } = useSelector((state: RootState) => state.tool);
  const { startDrawing, drawMove, stopDrawing } = useDrawing(canvasRef, activeTool, getCoordinates, toolColor);

  const cursor = activeTool === "eraser"
    ? `url(${eraser}) 0 32, crosshair`
    : `url(${paintBrush}) 0 32, crosshair`;

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToolWidth(Number(event.target.value))
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToolColor(event.target.value)
  }

  return (
    <>
      <div
        style={{boxShadow: '15px 10px 30px #000', backgroundColor: '#16202A'}}
        className="p-5 border-2 border-gray-700 rounded-xl mt-2"
      >
        <div className="mb-3 px-2 flex justify-center flex-wrap gap-8">
          <div className='flex items-center gap-3'>
            <p>Толщина</p>
            <div>
              <input
                min={MIN_WIDTH}
                max={MAX_WIDTH}
                value={toolWidth}
                type='range'
                style={{accentColor: '#9158F5', marginRight: '10px'}}
                onChange={handleWidthChange}
              />
            </div>
          </div>
          <div className="flex gap-15">
            <div className='flex items-center gap-3'>
              <p>Цвет</p>
              <div><input type='color' value={toolColor} onChange={handleColorChange}/></div>
            </div>
            <button className='flex items-center gap-1 cursor-pointer' onClick={clearCanvas}>
              <MdDelete/>
              Очистить холст
            </button>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className='w-full h-full bg-white rounded-xl min-h-[65vh] mb-4'
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
        <ManagePanel canvasRef={canvasRef}/>
      </div>
    </>
  );
}
