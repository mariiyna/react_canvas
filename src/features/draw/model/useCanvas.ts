import React, {useEffect, useRef} from "react";
import {MIN_WIDTH} from "@/features/draw/model/CONSTS.ts";
import {useDispatch} from "react-redux";
import {pushState} from "@/features/manageDraw/model/historySlice.ts";

export const useCanvas = (toolWidth: number = MIN_WIDTH) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      return
    }

    canvasContext.lineCap = 'round'
    canvasContext.lineWidth = toolWidth;
    canvasContext.fillStyle = '#fff'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    const data = canvas.toDataURL()
    dispatch(pushState(data))
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current
    const canvasContext = canvas?.getContext('2d')

    if (!canvas || !canvasContext) {
      return;
    }
    canvasContext.lineWidth = toolWidth
  }, [toolWidth])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const canvasContext = canvas?.getContext('2d')
    if (!canvas || !canvasContext) {
      return;
    }
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    const data = canvas.toDataURL()
    dispatch(pushState(data))
  }

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in event) {
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

  return { canvasRef, getCoordinates, clearCanvas };
}